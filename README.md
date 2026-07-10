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

AWIS ships to Google Play with [EAS Build](https://docs.expo.dev/build/introduction/) and [EAS Submit](https://docs.expo.dev/submit/introduction/).

- **Package:** `com.awis.app`
- **Artifact:** Android App Bundle (`.aab`)
- **Default track:** `internal` (change in `eas.json` or pass `--track` on submit)

### One-time Google Play Console setup

1. Create the app in [Google Play Console](https://play.google.com/console) with package name **`com.awis.app`**.
2. Complete required store listing, content rating, target audience, and data safety (the app is offline, no account, no analytics).
3. Create a **Google Cloud service account** with access to the Play Console API:
   - Play Console → **Setup** → **API access** → link a Google Cloud project
   - Create a service account → grant **Release manager** (or Admin) for the AWIS app
   - Create a JSON key and download it

### Secrets on your machine

1. Save the JSON key as `google-play-service-account.json` in the project root (gitignored).
2. Log in to Expo: `npx eas-cli login`
3. Ensure EAS has your Android signing credentials (first build will prompt or use existing keystore on Expo).

### Commands

**Cloud build** on EAS servers:

```bash
npm run build:android
```

**Cloud build and submit** to the default track (`internal`):

```bash
npm run deploy:android
```

Submit the latest cloud build to a specific track:

```bash
npm run submit:android -- --track production
```

Production builds **exclude** `expo-dev-client` automatically (see `app.config.js`).

### Versioning

- **User-facing version** (`1.0.0`): set in `app.json` → `expo.version`
- **Version code**: `expo.android.versionCode` in `app.json` is the baseline; EAS **auto-increments** it on each production build (`eas.json` → `production.android.autoIncrement`)

Bump `expo.version` manually when releasing a new user-visible version.

### Store listing

Manage listing text, screenshots, and release notes manually in [Google Play Console](https://play.google.com/console). EAS Submit uploads the binary only.

### Troubleshooting

| Issue | Fix |
|-------|-----|
| Submit fails: permissions | Service account needs Release manager on the app |
| Package name mismatch | Play app must use `com.awis.app` |
| First upload rejected | Complete Play Console checklist (privacy policy URL, etc.) |
| Build missing dev client | Expected for production; use `development` profile for dev builds |

Privacy policy: host `PRIVACY.md` on a public URL and link it in Play Console.

## Data

Aerodrome records are bundled from `assets/data/data.json` (~223 locations). The app works offline with no backend.
