# AWIS

Search Australian aerodromes and dial AWIS (Automatic Weather Information Service) phone numbers. Works offline — aerodrome data is bundled in the app.

Built with [Expo](https://expo.dev), [Expo Router](https://docs.expo.dev/router/introduction/), and [Tamagui](https://tamagui.dev). Android only for now (iOS later).

## Prerequisites

- Node.js 22+ (see `.nvmrc`)
- [Android Studio](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical&mode=development-build&buildEnv=local) with an Android SDK, emulator, or a USB-connected device

This project is not compatible with Expo Go. Use a local debug build instead ([local app compilation](https://docs.expo.dev/guides/local-app-development/#local-app-compilation)).

## Setup

```bash
npm install
npm run android   # first time / after native changes — compiles, installs, starts Metro
npm start         # JS-only changes after that
```

| Command | When to use it |
|---------|----------------|
| `npm run android` | First build, after adding a native library, or after changing a config plugin |
| `npm start` | Daily development when only changing JavaScript or TypeScript |

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro |
| `npm run android` | Local Android debug build + install |
| `npm run build:android` | Production Android build on EAS |

## License

See [LICENSE.md](LICENSE.md). Privacy policy: [PRIVACY.md](PRIVACY.md).
