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

## Production builds

```bash
eas build --profile production
eas submit --platform android
```

Android submit requires a Google Play service account key at `./expo-*.json` (gitignored).

## Data

Aerodrome records are bundled from `assets/data/data.json` (~223 locations). The app works offline with no backend.
