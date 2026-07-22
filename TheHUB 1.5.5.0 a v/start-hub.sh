#!/usr/bin/env bash
cd "$(dirname "$0")"
URL="http://127.0.0.1:8000/?hub_launch=$(date +%s)"
echo "Starting Hub at $URL"
echo "Opening in Chrome/Chromium if installed. Keep this terminal open. Press Ctrl+C to stop."
(sleep 1; (google-chrome "$URL" || chromium "$URL" || chromium-browser "$URL" || xdg-open "$URL") >/dev/null 2>&1 || true) &
if command -v python3 >/dev/null 2>&1; then
  python3 server.py
else
  python server.py
fi
