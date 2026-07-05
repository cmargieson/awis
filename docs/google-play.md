# Google Play deployment

AWIS ships to Google Play with [EAS Build](https://docs.expo.dev/build/introduction/) and [EAS Submit](https://docs.expo.dev/submit/introduction/).

- **Package:** `com.awis.app`
- **Artifact:** Android App Bundle (`.aab`)
- **Default track:** `internal` (change in `eas.json` or the GitHub Action)

## One-time Google Play Console setup

1. Create the app in [Google Play Console](https://play.google.com/console) with package name **`com.awis.app`**.
2. Complete required store listing, content rating, target audience, and data safety (the app is offline, no account, no analytics).
3. Create a **Google Cloud service account** with access to the Play Console API:
   - Play Console → **Setup** → **API access** → link a Google Cloud project
   - Create a service account → grant **Release manager** (or Admin) for the AWIS app
   - Create a JSON key and download it

## Local deployment

### Secrets on your machine

1. Save the JSON key as `google-play-service-account.json` in the project root (gitignored).
2. Log in to Expo: `npx eas-cli login`
3. Ensure EAS has your Android signing credentials (first build will prompt or use existing keystore on Expo).

### Commands

Build a store AAB:

```bash
npm run build:android
```

Build and submit to the default track (`internal`):

```bash
npm run deploy:android
```

Submit the latest production build to a specific track:

```bash
npm run submit:android -- --track production
```

Production builds **exclude** `expo-dev-client` automatically (see `app.config.js`).

## GitHub Actions deployment

Workflow: [`.github/workflows/deploy-android.yml`](../.github/workflows/deploy-android.yml)

### Repository secrets

| Secret | Description |
|--------|-------------|
| `EXPO_TOKEN` | Expo access token from [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens) |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Full contents of the Play Console service account JSON file |

### Run a deploy

1. GitHub → **Actions** → **Deploy Android to Google Play** → **Run workflow**
2. Choose track (`internal`, `alpha`, `beta`, or `production`)
3. Leave **Submit** enabled to upload after the build finishes

## Versioning

- **User-facing version** (`1.0.0`): set in `app.json` → `expo.version`
- **Version code**: `expo.android.versionCode` in `app.json` is the baseline; EAS **auto-increments** it on each production build (`eas.json` → `production.android.autoIncrement`)

Bump `expo.version` manually when releasing a new user-visible version.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Submit fails: permissions | Service account needs Release manager on the app |
| Package name mismatch | Play app must use `com.awis.app` |
| First upload rejected | Complete Play Console checklist (privacy policy URL, etc.) |
| Build missing dev client | Expected for production; use `development` profile for dev builds |

Privacy policy: host `PRIVACY.md` on a public URL and link it in Play Console.
