# AWIS

Search Australian aerodromes and dial AWIS (Automatic Weather Information Service) phone numbers. Works offline — aerodrome data is bundled in the app.

Built with [Expo](https://expo.dev), [Expo Router](https://docs.expo.dev/router/introduction/), and [Tamagui](https://tamagui.dev). Android only for now (iOS later).

## Prerequisites

- Node.js 22+ (see `.nvmrc`)
- An [Expo](https://expo.dev) account (`npx eas-cli login`)

Native builds run on [EAS Build](https://docs.expo.dev/build/introduction/). You do not need the Android SDK or JDK locally.

## Setup

```bash
npm install
npm run android   # EAS cloud development build (APK)
```

When the build finishes, install the APK from the Expo dashboard (or the install link / QR code EAS prints). Then:

```bash
npm start         # Metro — live JS updates while the app is open
```

| Command | When to use it |
|---------|----------------|
| `npm run android` | First install, after adding a native library, or after changing a config plugin / native `app.json` fields |
| `npm start` | Daily development when only changing JavaScript or TypeScript |

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro (live reload) |
| `npm run android` | Development client APK on EAS |
| `npm run build:android` | Production Android AAB on EAS |

## License

See [LICENSE.md](LICENSE.md). Privacy policy: [PRIVACY.md](PRIVACY.md).
