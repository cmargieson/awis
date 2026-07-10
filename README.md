# AWIS

Search Australian aerodromes and dial AWIS (Automatic Weather Information Service) phone numbers. Works offline — aerodrome data is bundled in the app.

Built with [Expo](https://expo.dev), [Expo Router](https://docs.expo.dev/router/introduction/), and [Tamagui](https://tamagui.dev). Android only for now (iOS later).

## Setup

Requires Node.js 22+ (see `.nvmrc`).

```bash
npm install
```

Connect a phone with USB debugging (or start an emulator), then:

```bash
npm run android:run   # first time / after native changes
npm start             # JS-only changes after that
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro |
| `npm run android:run` | Local Android debug build + install |
| `npm run lint` | Lint with Biome |
| `npm run typecheck` | TypeScript check |
| `npm run build:android` | Production Android build on EAS |
| `npm run deploy:android` | Build and submit to Google Play |

## License

See [LICENSE.md](LICENSE.md). Privacy policy: [PRIVACY.md](PRIVACY.md).
