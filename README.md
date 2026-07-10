# AWIS

Search Australian aerodromes and dial AWIS (Automatic Weather Information Service) phone numbers. Works offline — aerodrome data is bundled in the app.

Built with [Expo](https://expo.dev), [Expo Router](https://docs.expo.dev/router/introduction/), and [Tamagui](https://tamagui.dev). Android only for now (iOS later).

## Setup

Requires Node.js 22+ (see `.nvmrc`).

```bash
npm install
npm run android   # first time / after native changes
npm start         # JS-only changes after that
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro |
| `npm run android` | Local Android debug build + install |
| `npm run build:android` | Production Android build on EAS |

## License

See [LICENSE.md](LICENSE.md). Privacy policy: [PRIVACY.md](PRIVACY.md).
