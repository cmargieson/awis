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
# Build store AAB on EAS
npm run build:android

# Build and submit to Google Play (default track: internal)
npm run deploy:android

# Submit latest build to a track
npm run submit:android -- --track production
```

Place your Play Console service account JSON at `./google-play-service-account.json` (gitignored), or use GitHub Actions with the `GOOGLE_SERVICE_ACCOUNT_KEY` secret.

## Data

Aerodrome records are bundled from `assets/data/data.json` (~223 locations). The app works offline with no backend.
