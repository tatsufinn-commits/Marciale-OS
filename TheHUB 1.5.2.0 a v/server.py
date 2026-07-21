#!/usr/bin/env python3
"""
Optional local server for Hub.

Run:
    python server.py
Then open:
    http://localhost:8000

Security notes:
- Binds to 127.0.0.1 by default so other devices on your network cannot reach it.
- The Mapúa/Blackboard calendar feed URL is read from MAPUA_ICS_URL. Do not commit
  private calendar feed URLs to git; they often act like secret bearer tokens.
"""
import datetime as _dt
import ipaddress
import json
import os
import re
import socket
import urllib.parse
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "bookmarks.json")
HUB_DATA = os.path.join(HERE, "hub-data.json")
MAX_HUB_DATA_BYTES = 20 * 1024 * 1024
MAX_FETCH_BYTES = 1 * 1024 * 1024
PORT = int(os.environ.get("HUB_PORT", "8000"))
HOST = os.environ.get("HUB_HOST", "127.0.0.1")
MAPUA_ICS_URL = os.environ.get("MAPUA_ICS_URL", "").strip()

CSP = (
    "default-src 'self'; "
    "script-src 'self' 'unsafe-inline'; "
    "style-src 'self' 'unsafe-inline'; "
    "img-src 'self' data: blob: https:; "
    "connect-src 'self' https: http://127.0.0.1:* http://localhost:*; "
    "worker-src 'self'; manifest-src 'self'; object-src 'none'; "
    "base-uri 'none'; frame-ancestors 'self'; form-action 'none'"
)


def _unfold_ics_lines(text):
    """Unfold iCalendar continuation lines (lines starting with space/tab)."""
    lines = text.replace("\r\n", "\n").replace("\r", "\n").split("\n")
    unfolded = []
    for line in lines:
        if line.startswith((" ", "\t")) and unfolded:
            unfolded[-1] += line[1:]
        else:
            unfolded.append(line)
    return unfolded


def _ics_unescape(value):
    """Undo iCalendar text escaping for SUMMARY/DESCRIPTION/etc."""
    return (
        value.replace("\\\\", "\\")
        .replace("\\;", ";")
        .replace("\\,", ",")
        .replace("\\n", "\n")
        .replace("\\N", "\n")
    )


def _parse_ics_datetime(value, params=None):
    """
    Parse a DTSTART/DTEND value into a local date string and time string.

    Handles:
      - 20260620              (all-day, VALUE=DATE)
      - 20260620T153000       (local/floating time)
      - 20260620T153000Z      (UTC, converted to local server time)
      - DTSTART;TZID=...:...  (TZID ignored, treated as local time)
    """
    val = value.strip()
    all_day = (
        (params and "VALUE=DATE" in params.upper())
        or (len(val) == 8 and val.isdigit())
    )

    if all_day and len(val) >= 8 and val[:8].isdigit():
        return f"{val[:4]}-{val[4:6]}-{val[6:8]}", ""

    if len(val) < 15 or not val[:8].isdigit():
        return "", ""

    date_part = val[:8]
    time_part = val[9:15]

    if val.endswith("Z") and len(val) >= 16:
        # UTC -> convert to local server time
        try:
            utc = _dt.datetime.strptime(val[:15], "%Y%m%dT%H%M%S")
            local = _dt.datetime.fromtimestamp(utc.replace(tzinfo=_dt.timezone.utc).timestamp())
            return local.strftime("%Y-%m-%d"), local.strftime("%H:%M")
        except Exception:
            pass

    return f"{date_part[:4]}-{date_part[4:6]}-{date_part[6:8]}", f"{time_part[:2]}:{time_part[2:4]}"


def _remind_from_alarms(alarms):
    """Convert VALARM TRIGGER offsets to Hub reminder offsets (e.g. '2,0')."""
    days = set()
    for trigger in alarms:
        t = str(trigger).upper().strip()
        # Match -P1D, -PT0M, -PT9H, -P0D, etc.
        m = re.match(r"^-P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$", t)
        if not m:
            continue
        d = int(m.group(1) or 0)
        h = int(m.group(2) or 0)
        mnt = int(m.group(3) or 0)
        if d > 0:
            days.add(str(d))
        elif h > 0 or mnt >= 0:
            days.add("0")
    if not days:
        return "2,0"
    return ",".join(sorted(days, key=lambda x: int(x), reverse=True))


def _recur_from_rrule(rrule):
    """Extract simple recurrence frequency from RRULE."""
    if not rrule:
        return ""
    m = re.search(r"FREQ=(DAILY|WEEKLY|MONTHLY|YEARLY)", rrule, re.IGNORECASE)
    return m.group(1).lower() if m else ""


def parse_ics(ics_data):
    """Parse iCalendar VEVENT blocks into Hub event objects."""
    events = []
    lines = _unfold_ics_lines(ics_data)

    current = None
    in_alarm = False
    alarms = []

    for raw in lines:
        line = raw.strip()
        if not line:
            continue

        if line == "BEGIN:VEVENT":
            current = {"uid": None, "title": "", "desc": "", "date": "", "time": "", "rrule": "", "location": "", "alarms": []}
            in_alarm = False
            continue

        if line == "END:VEVENT":
            if current and current.get("date") and current.get("title"):
                # Detect deadlines from title keywords
                is_deadline = bool(
                    re.search(r"deadline|due|submission|submit|exam|quiz|test|finals", current["title"], re.IGNORECASE)
                )
                events.append({
                    "id": f"mapua_{len(events)}",
                    "title": "[Mapúa] " + current["title"],
                    "type": "deadline" if is_deadline else "event",
                    "date": current["date"],
                    "time": current.get("time", ""),
                    "notes": (current.get("desc", "") + (f"\nLocation: {current['location']}" if current.get("location") else "")).strip(),
                    "remind": _remind_from_alarms(current.get("alarms", [])),
                    "color": "#e03a3a" if is_deadline else "#6c8cff",
                    "fired": [],
                    "readonly": True,
                    "recur": _recur_from_rrule(current.get("rrule", "")),
                    "sourceUid": current.get("uid") or "",
                })
            current = None
            in_alarm = False
            continue

        if not current:
            continue

        if line == "BEGIN:VALARM":
            in_alarm = True
            continue

        if line == "END:VALARM":
            in_alarm = False
            continue

        # Split property name/parameters from value on first colon or semicolon
        if ":" not in line:
            continue

        prop_part, value = line.split(":", 1)
        prop_parts = prop_part.split(";")
        prop = prop_parts[0].upper()
        params = ";".join(prop_parts[1:]) if len(prop_parts) > 1 else ""

        if prop == "SUMMARY":
            current["title"] = _ics_unescape(value)
        elif prop == "DESCRIPTION":
            current["desc"] = _ics_unescape(value)
        elif prop == "LOCATION":
            current["location"] = _ics_unescape(value)
        elif prop == "UID":
            current["uid"] = value.strip()
        elif prop == "DTSTART":
            d, t = _parse_ics_datetime(value, params)
            if d:
                current["date"] = d
            if t:
                current["time"] = t
        elif prop == "DTEND":
            # DTEND is not used directly in Hub, but store it if needed later
            current["dtend"] = _parse_ics_datetime(value, params)
        elif prop == "RRULE":
            current["rrule"] = value
        elif in_alarm and prop == "TRIGGER":
            current["alarms"].append(value.strip())

    return events


def valid_feed_url(url):
    try:
        parsed = urlparse(url)
        return parsed.scheme == "https" and bool(parsed.netloc)
    except Exception:
        return False


def _is_blocked_ip(ip_text):
    try:
        ip = ipaddress.ip_address(ip_text)
        return (
            ip.is_private
            or ip.is_loopback
            or ip.is_link_local
            or ip.is_multicast
            or ip.is_reserved
            or ip.is_unspecified
        )
    except ValueError:
        return True


def valid_fetch_url(url):
    """Allow public http(s) URLs for Assistant website reading; block local/private SSRF targets."""
    try:
        parsed = urlparse(url)
        if parsed.scheme not in ("http", "https") or not parsed.hostname:
            return False
        if parsed.username or parsed.password:
            return False
        host = parsed.hostname
        # Literal IP address.
        try:
            ipaddress.ip_address(host)
            if _is_blocked_ip(host):
                return False
        except ValueError:
            # Hostname: resolve and block if any answer points at a private/local range.
            try:
                infos = socket.getaddrinfo(host, parsed.port or (443 if parsed.scheme == "https" else 80), type=socket.SOCK_STREAM)
                for info in infos:
                    if _is_blocked_ip(info[4][0]):
                        return False
            except Exception:
                return False
        return True
    except Exception:
        return False


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=HERE, **kw)

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        self.send_header("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()")
        self.send_header("Content-Security-Policy", CSP)
        # Revalidate app code/service worker so Chrome does not keep stale Hub versions.
        # The service worker also uses network-first for JS/CSS, but these headers help
        # normal browser cache and first-time loads as well.
        req_path = self.path.split('?', 1)[0]
        if req_path in ("/", "/index.html", "/sw.js") or req_path.endswith((".js", ".css")):
            self.send_header("Cache-Control", "no-cache, max-age=0, must-revalidate")
        super().end_headers()

    def _origin_allowed(self):
        origin = self.headers.get("Origin") or self.headers.get("Referer")
        if not origin:
            return True
        try:
            parsed = urlparse(origin)
            req_host = (self.headers.get("Host", "").split(":", 1)[0] or "").strip("[]")
            return parsed.hostname in {"127.0.0.1", "localhost", "::1"} or parsed.hostname == req_host
        except Exception:
            return False

    def _cors_origin(self):
        origin = self.headers.get("Origin")
        if origin and self._origin_allowed():
            return origin
        return "http://localhost:%d" % PORT

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", self._cors_origin())
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def _json(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", self._cors_origin())
        self.send_header("Vary", "Origin")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json_body(self, max_bytes=MAX_HUB_DATA_BYTES):
        length = int(self.headers.get("Content-Length", 0))
        if length > max_bytes:
            raise ValueError("request too large")
        raw = self.rfile.read(length)
        return json.loads(raw or b"{}")

    def do_GET(self):

        if self.path.startswith("/api/fetch"):
            qs = urllib.parse.parse_qs(urlparse(self.path).query)
            url = (qs.get("url") or [""])[0]
            if not valid_fetch_url(url):
                return self._json({"ok": False, "error": "Only public http(s) URLs are allowed"}, 400)
            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 Hub Local Assistant'})
                with urllib.request.urlopen(req, timeout=10) as resp:
                    raw = resp.read(MAX_FETCH_BYTES + 1)
                    if len(raw) > MAX_FETCH_BYTES:
                        return self._json({"ok": False, "error": "response too large"}, 413)
                    charset = resp.headers.get_content_charset() or 'utf-8'
                    html = raw.decode(charset, errors='ignore')
                    # Strip scripts/styles and collapse HTML to readable text.
                    html = re.sub(r'<script.*?>.*?</script>', '', html, flags=re.IGNORECASE | re.DOTALL)
                    html = re.sub(r'<style.*?>.*?</style>', '', html, flags=re.IGNORECASE | re.DOTALL)
                    text_content = re.sub(r'<[^>]+>', ' ', html)
                    text_content = re.sub(r'\s+', ' ', text_content).strip()
                    return self._json({"ok": True, "text": text_content[:15000]})
            except Exception as e:
                return self._json({"ok": False, "error": str(e)}, 500)

        if self.path.split('?', 1)[0] == "/api/hub-data":
            if os.path.exists(HUB_DATA):
                try:
                    with open(HUB_DATA, encoding="utf-8") as f:
                        data = json.load(f)
                    if isinstance(data, dict):
                        return self._json(data)
                except Exception as e:
                    return self._json({"ok": False, "error": str(e), "keys": {}}, 500)
            return self._json({"ok": True, "keys": {}, "updated": None})

        if self.path == "/api/bookmarks":
            if os.path.exists(DATA):
                with open(DATA, encoding="utf-8") as f:
                    return self._json(json.load(f))
            return self._json([])

        if self.path == "/api/mapua":
            if not MAPUA_ICS_URL:
                return self._json({"ok": False, "error": "MAPUA_ICS_URL is not configured", "events": []}, 200)
            if not valid_feed_url(MAPUA_ICS_URL):
                return self._json({"ok": False, "error": "MAPUA_ICS_URL must be an https URL", "events": []}, 400)
            try:
                req = urllib.request.Request(MAPUA_ICS_URL, headers={
                    'User-Agent': 'Mozilla/5.0 Hub Calendar Sync'
                })
                with urllib.request.urlopen(req, timeout=10) as response:
                    ics_data = response.read().decode('utf-8')
                    events = parse_ics(ics_data)
                    print(f"[Mapúa Sync] Fetched and parsed {len(events)} events.")
                    return self._json({"ok": True, "events": events})
            except Exception as e:
                print(f"[Mapúa Sync Error] {e}")
                return self._json({"ok": False, "error": str(e), "events": []}, 502)

        return super().do_GET()

    def do_POST(self):
        if not self._origin_allowed():
            return self._json({"ok": False, "error": "origin not allowed"}, 403)

        if self.path == "/api/hub-data":
            try:
                parsed = self._read_json_body()
                keys = parsed.get("keys", parsed)
                if not isinstance(keys, dict):
                    raise ValueError("expected keys object")
                clean = {str(k): str(v) for k, v in keys.items() if str(k).startswith("hub.")}
                payload = {"ok": True, "updated": __import__("datetime").datetime.utcnow().isoformat() + "Z", "keys": clean}
                tmp = HUB_DATA + ".tmp"
                with open(tmp, "w", encoding="utf-8") as f:
                    json.dump(payload, f, indent=2)
                os.replace(tmp, HUB_DATA)
                return self._json({"ok": True, "count": len(clean), "updated": payload["updated"]})
            except Exception as e:
                return self._json({"ok": False, "error": str(e)}, 400)

        if self.path == "/api/bookmarks":
            length = int(self.headers.get("Content-Length", 0))
            data = self.rfile.read(length)
            try:
                parsed = json.loads(data)
                if not isinstance(parsed, list):
                    raise ValueError("expected a list")
            except Exception:
                return self._json({"error": "bad json"}, 400)
            with open(DATA, "w", encoding="utf-8") as f:
                json.dump(parsed, f, indent=2)
            return self._json({"ok": True, "count": len(parsed)})
        return self._json({"error": "not found"}, 404)


if __name__ == "__main__":
    print(f"Hub running at http://{HOST}:{PORT}  (Ctrl+C to stop)")
    print(f"Storing bookmarks in: {DATA}")
    print(f"Shared Hub data file: {HUB_DATA}")
    if MAPUA_ICS_URL:
        print("Mapúa sync: enabled via MAPUA_ICS_URL")
    else:
        print("Mapúa sync: disabled (set MAPUA_ICS_URL to enable; do not commit the URL)")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
