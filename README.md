# AWIS

Search Australian aerodromes and dial AWIS (Automatic Weather Information Service) phone numbers. Works offline — aerodrome data is bundled in the app.

Built with [Expo](https://expo.dev), [Expo Router](https://docs.expo.dev/router/introduction/), [Uniwind](https://docs.uniwind.dev/), and [React Native Reusables](https://reactnativereusables.com/). Android only for now (iOS later).

## Prerequisites

- Node.js 22+ (see `.nvmrc`)
- An [Expo](https://expo.dev) account (`npx eas-cli login`)

Native builds run on [EAS Build](https://docs.expo.dev/build/introduction/). You do not need the Android SDK or JDK locally.

## Setup

```bash
npm install
npm run build:dev:android   # EAS cloud development build (APK)
```

When the build finishes, install the APK from the Expo dashboard (or the install link / QR code EAS prints). Then:

```bash
npm run dev   # Metro — live JS updates while the app is open
```

| Command | When to use it |
|---------|----------------|
| `npm run build:dev:android` | First install, after adding a native library, or after changing a config plugin / native `app.json` fields |
| `npm run dev` | Daily development when only changing JavaScript or TypeScript |
| `npm run android` | Same as `dev`, but also open on a connected Android device/emulator |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Metro with the development client |
| `npm run android` | Start Metro and open on Android |
| `npm run ios` | Start Metro and open on iOS |
| `npm run web` | Start Metro for web |
| `npm run build:dev` | Development client build on EAS (all platforms) |
| `npm run build:dev:android` | Development client APK on EAS |
| `npm run build:dev:ios` | Development client build for iOS on EAS |
| `npm run build:preview` | Preview build on EAS |
| `npm run build:production` | Production store build on EAS |
| `npm run clean` | Remove `.expo` and `node_modules` |
| `npx eas-cli submit --platform android --profile production` | Upload the latest production AAB to Google Play (internal track) |

## Submit to Google Play

1. Place a Play Console service account JSON key at `google-play-service-account.json` (gitignored).
2. Build a store AAB:

```bash
npm run build:production
```

3. Submit it:

```bash
npx eas-cli submit --platform android --profile production
```

This uses the `production` submit profile in `eas.json` (internal track, `completed` release status). Promote the build in [Play Console](https://play.google.com/console) when ready for wider release.

## License

See [LICENSE.md](LICENSE.md). Privacy policy: [PRIVACY.md](PRIVACY.md).
