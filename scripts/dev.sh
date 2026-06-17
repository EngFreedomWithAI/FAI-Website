#!/usr/bin/env bash
# Start the Astro dev server reliably on port 4321.
# Frees the port first (kills any stale server) so it never drifts to 4322/4323.
set -euo pipefail

PORT="${PORT:-4321}"
cd "$(dirname "$0")/.."

# Free the port if something is already holding it.
PIDS="$(lsof -ti "tcp:${PORT}" 2>/dev/null || true)"
if [ -n "${PIDS}" ]; then
  echo "Port ${PORT} in use by PID(s): ${PIDS} — stopping them."
  echo "${PIDS}" | xargs kill -9 2>/dev/null || true
  sleep 1
fi

echo "Starting Astro dev server on http://localhost:${PORT}/"
exec npx astro dev --port "${PORT}"
