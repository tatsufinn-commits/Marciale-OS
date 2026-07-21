#!/bin/zsh
cd "$(dirname "$0")"
URL="http://127.0.0.1:8000/?hub_launch=$(date +%s)"
echo "Starting Hub at $URL"
echo "Opening in Google Chrome if installed. Keep this window open. Press Ctrl+C to stop."
(sleep 1; open -a "Google Chrome" "$URL" 2>/dev/null || open "$URL") &
if command -v python3 >/dev/null 2>&1; then
  python3 server.py
else
  python server.py
fi
