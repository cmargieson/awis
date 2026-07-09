#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

OUTPUT="${1:-$ROOT/release/awis-release.aab}"
mkdir -p "$(dirname "$OUTPUT")"

export EAS_BUILD_PROFILE=production

echo "==> AWIS local release build (EAS + Docker)"
echo "    Profile: production"
echo "    Output:  $OUTPUT"

npx eas-cli build \
  --platform android \
  --profile production \
  --local \
  --non-interactive \
  --output "$OUTPUT"

echo ""
echo "==> Build complete"
ls -lh "$OUTPUT"
