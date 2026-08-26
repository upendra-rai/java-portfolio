#!/usr/bin/env bash
# Regenerates public/Upendra-Rai-Resume.pdf from the locally served export.
# Usage: npm run build && npm run start (in another tab) → npm run pdf
set -euo pipefail

PORT="${PORT:-3000}"
URL="http://localhost:${PORT}/java-portfolio/resume/"
OUT="public/Upendra-Rai-Resume.pdf"

CHROME=""
for c in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"; do
  [ -x "$c" ] && CHROME="$c" && break
done

if [ -z "$CHROME" ]; then
  echo "No Chromium-based browser found. Install Google Chrome and retry."
  exit 1
fi

PROFILE="$(mktemp -d)"
rm -f "$OUT"
"$CHROME" --headless=new --disable-gpu --no-sandbox --user-data-dir="$PROFILE" \
  --virtual-time-budget=10000 --no-pdf-header-footer \
  --print-to-pdf="$(pwd)/$OUT" "$URL" >/dev/null 2>&1 &
CPID=$!

for _ in $(seq 1 40); do
  [ -s "$OUT" ] && break
  sleep 1
done
kill "$CPID" 2>/dev/null || true

if [ -s "$OUT" ]; then
  echo "✔ Generated $OUT ($(du -h "$OUT" | cut -f1))"
else
  echo "✖ Failed to generate PDF. Is the preview server running on port ${PORT}?"
  exit 1
fi
