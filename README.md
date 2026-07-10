# AWIS

Search Australian aerodromes and dial AWIS (Automatic Weather Information Service) phone numbers. Works offline — aerodrome data is bundled in the app.

Built with [Expo](https://expo.dev), [Expo Router](https://docs.expo.dev/router/introduction/), and [Tamagui](https://tamagui.dev). Android only for now (iOS later).

## Prerequisites

- Node.js 22+ (see `.nvmrc`)
- [Android SDK](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical&mode=development-build&buildEnv=local) (JDK 17, `ANDROID_HOME`)

This project is not compatible with Expo Go. Use a local debug APK instead ([local app compilation](https://docs.expo.dev/guides/local-app-development/#local-app-compilation)).

## Setup

```bash
npm install
npm run android   # builds a debug APK (no emulator)
```

APK path: `android/app/build/outputs/apk/debug/app-debug.apk`

Install it on your phone (copy the file, or `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`), then:

```bash
npm start         # Metro — live JS updates while the app is open
```

If the phone cannot reach Metro over Wi‑Fi, with USB connected:

```bash
adb reverse tcp:8081 tcp:8081
```

| Command | When to use it |
|---------|----------------|
| `npm run android` | First build, after adding a native library, or after changing a config plugin |
| `npm start` | Daily development when only changing JavaScript or TypeScript |

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro (live reload) |
| `npm run android` | Build local debug APK only |
| `npm run build:android` | Production Android build on EAS |

## License

See [LICENSE.md](LICENSE.md). Privacy policy: [PRIVACY.md](PRIVACY.md).
