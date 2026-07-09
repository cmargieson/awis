#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

AAB="${1:-$ROOT/release/awis-release.aab}"
TRACK="${2:-internal}"
SERVICE_ACCOUNT="$ROOT/google-play-service-account.json"

if [[ ! -f "$AAB" ]]; then
  echo "ERROR: AAB not found: $AAB"
  echo "Run: npm run build:android:local"
  exit 1
fi

if [[ ! -f "$SERVICE_ACCOUNT" ]]; then
  echo "ERROR: Missing $SERVICE_ACCOUNT"
  echo "Download the Play Console service account JSON and save it there."
  exit 1
fi

echo "==> Submitting $AAB to Google Play ($TRACK track)"
npx eas-cli submit \
  --platform android \
  --profile production \
  --path "$AAB" \
  --track "$TRACK" \
  --non-interactive

echo "==> Submit complete"
