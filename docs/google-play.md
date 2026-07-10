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
4. Install [Docker](https://docs.docker.com/get-docker/) for local EAS builds, or use the Gradle path below.

### Commands

**Local build (recommended)** — runs on your machine via EAS + Docker, uses signing credentials stored on Expo:

```bash
npm run build:android:local
```

Output: `release/awis-release.aab`

**Local build (Gradle, no Docker)** — after exporting your upload keystore from `npx eas-cli credentials -p android` into `android/keystore.properties`:

```bash
npm run build:android:gradle
```

**Submit a local AAB** to the default track (`internal`):

```bash
npm run submit:android:local
# or specify track: npm run submit:android:local -- release/awis-release.aab production
```

**Build and submit locally:**

```bash
npm run deploy:android:local
```

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

## GitHub Actions deployment

Workflow: [`.github/workflows/deploy-android.yml`](../.github/workflows/deploy-android.yml)

### Repository secrets

| Secret | Description |
|--------|-------------|
| `EXPO_TOKEN` | Expo access token from [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens) |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Full contents of the Play Console service account JSON file |

To add `GOOGLE_SERVICE_ACCOUNT_KEY`:

1. Open your local `google-play-service-account.json` (or download a new key from Play Console → Setup → API access).
2. Copy the **entire** JSON file contents (starts with `{`, ends with `}`).
3. GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
4. Name: `GOOGLE_SERVICE_ACCOUNT_KEY`
5. Paste the JSON as the secret value and save.

Do not wrap the JSON in quotes or base64-encode it — paste the raw file contents.

### Run a deploy

1. GitHub → **Actions** → **Deploy Android to Google Play** → **Run workflow**
2. Choose track (`internal`, `alpha`, `beta`, or `production`)
3. Leave **Submit** enabled to upload after the build finishes
4. Enable **Push store listing metadata** when listing text or screenshots changed (opt-in, default off)

## Versioning

- **User-facing version** (`1.0.0`): set in `app.json` → `expo.version`
- **Version code**: `expo.android.versionCode` in `app.json` is the baseline; EAS **auto-increments** it on each production build (`eas.json` → `production.android.autoIncrement`)

Bump `expo.version` manually when releasing a new user-visible version.

## Store listing metadata (Fastlane Supply)

Listing text, screenshots, and release notes live in the repo under `fastlane/metadata/android/en-AU/`. EAS Submit uploads the binary only; [Fastlane Supply](https://docs.fastlane.tools/actions/supply/) pushes store metadata.

### One-time setup

```bash
bundle install
```

Uses the same `google-play-service-account.json` as EAS Submit (Release manager on the app).

### Commands

| Command | Purpose |
|---------|---------|
| `npm run metadata:android:generate` | Regenerate screenshots and graphics from app data |
| `npm run metadata:android:validate` | Dry-run validation against Play API |
| `npm run metadata:android` | Push metadata to the default track (`internal`) |
| `bundle exec fastlane android metadata track:production` | Push metadata to a specific track |
| `npm run metadata:android:init` | Pull existing Console listing into the repo (one-time sync) |

Edit listing copy in:

- `fastlane/metadata/android/en-AU/title.txt`
- `fastlane/metadata/android/en-AU/short_description.txt`
- `fastlane/metadata/android/en-AU/full_description.txt`

Screenshots: `fastlane/metadata/android/en-AU/images/phoneScreenshots/`

Release notes: `fastlane/metadata/android/en-AU/changelogs/<versionCode>.txt` (fallback: `default.txt`)

Content rating, data safety, and privacy policy URL remain manual in Play Console.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Submit fails: permissions | Service account needs Release manager on the app |
| Package name mismatch | Play app must use `com.awis.app` |
| First upload rejected | Complete Play Console checklist (privacy policy URL, etc.) |
| Build missing dev client | Expected for production; use `development` profile for dev builds |
| Metadata push fails | Run `npm run metadata:android:validate`; confirm service account has Release manager |
| Wrong locale on Play | Primary listing is `en-AU` under `fastlane/metadata/android/en-AU/` |

Privacy policy: host `PRIVACY.md` on a public URL and link it in Play Console.
