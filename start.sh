#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-3000}"
pids=$(lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true)
if [[ -n "${pids}" ]]; then
  kill ${pids} 2>/dev/null || true
  sleep 1
  pids=$(lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true)
  [[ -z "${pids}" ]] || kill -9 ${pids} 2>/dev/null || true
fi

if command -v bun >/dev/null 2>&1; then
  BUN=(bun)
else
  BUN=(npx --yes bun@1.2.5)
fi

# Browser bundle into pages/build/ (outdir required for font assets; avoids HTML-entry HMR bug)
"${BUN[@]}" build ./pages/app.ts --outdir ./pages/build --target=browser --format=esm

export HOST PORT
exec "${BUN[@]}" run ./scripts/serve-static.ts
