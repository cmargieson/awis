#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export EAS_BUILD_PROFILE=production
export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
export JAVA_HOME="${JAVA_HOME:-$(dirname "$(dirname "$(readlink -f "$(command -v java)")")")}"

KEYSTORE_PROPS="$ROOT/android/keystore.properties"
AAB_OUTPUT="$ROOT/release/awis-release.aab"

echo "==> AWIS Gradle release build (no Docker)"
echo "    Profile: production"
echo "    ANDROID_HOME: $ANDROID_HOME"

if [[ ! -d "$ANDROID_HOME" ]]; then
  echo "ERROR: Android SDK not found at $ANDROID_HOME"
  exit 1
fi

if [[ ! -f "$KEYSTORE_PROPS" ]]; then
  echo "ERROR: Missing $KEYSTORE_PROPS"
  echo ""
  echo "Export your upload keystore from EAS:"
  echo "  npx eas-cli credentials -p android"
  echo "  → Keystore → Download existing keystore"
  echo ""
  echo "Then create android/keystore.properties from keystore.properties.example"
  exit 1
fi

echo "==> Generating native Android project"
npx expo prebuild --platform android --clean --no-install

node "$ROOT/scripts/patch-android-signing.js"

echo "==> Building release App Bundle"
cd android
./gradlew bundleRelease --no-daemon

mkdir -p "$ROOT/release"
cp app/build/outputs/bundle/release/app-release.aab "$AAB_OUTPUT"

echo ""
echo "==> Build complete"
echo "    AAB: $AAB_OUTPUT"
ls -lh "$AAB_OUTPUT"
