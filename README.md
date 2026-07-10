# AWIS

Mobile app for searching Australian aerodromes and dialing AWIS (Automatic Weather Information Service) phone numbers.

Built with [Expo](https://expo.dev) SDK 57, [Expo Router](https://docs.expo.dev/router/introduction/), and [Tamagui](https://tamagui.dev).

## Requirements

- Node.js >= 22.13.0 (see `.nvmrc`)
- npm

## Setup

```bash
npm install
```

## Development

```bash
npx expo start
```

Platform shortcuts:

```bash
npm run android
npm run ios
npm run web
```

## Quality checks

```bash
npm run typecheck
npm run lint
npx expo-doctor
```

## Development builds

This project uses [expo-dev-client](https://docs.expo.dev/develop/development-builds/introduction/). After installing a development build on your device:

```bash
npm run start:dev
```

Build a new development APK on EAS:

```bash
eas build --profile development --platform android
```

## Google Play deployment

See [docs/google-play.md](docs/google-play.md) for full setup (Play Console, service account, CI secrets).

```bash
# Local release build (Docker + EAS signing on your machine)
npm run build:android:local

# Submit local AAB (requires google-play-service-account.json)
npm run submit:android:local

# Build and submit locally
npm run deploy:android:local

# Cloud build on EAS
npm run build:android
npm run deploy:android
```

Place your Play Console service account JSON at `./google-play-service-account.json` (gitignored).

## Data

Aerodrome records are bundled from `assets/data/data.json` (~223 locations). The app works offline with no backend.
