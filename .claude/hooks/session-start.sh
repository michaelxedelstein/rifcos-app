#!/bin/bash
set -euo pipefail

# Only run in remote environments (Claude Code on the web)
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install npm dependencies for each package in the repo.
# npm install is idempotent and benefits from the cached container state.
for dir in admin app functions; do
  echo "[session-start] Installing npm dependencies in $dir/"
  (cd "$CLAUDE_PROJECT_DIR/$dir" && npm install --no-audit --no-fund)
done

echo "[session-start] Environment setup complete."
