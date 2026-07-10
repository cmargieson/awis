# AWIS

Search Australian aerodromes and dial AWIS (Automatic Weather Information Service) phone numbers. Works offline — aerodrome data is bundled in the app.

Built with [Expo](https://expo.dev), [Expo Router](https://docs.expo.dev/router/introduction/), and [Tamagui](https://tamagui.dev).

## Setup

Requires Node.js 22+ (see `.nvmrc`).

```bash
npm install
npx expo start
```

Then press `a` for Android, `i` for iOS, or `w` for web.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo (clears cache) |
| `npm run lint` | Lint with Biome |
| `npm run typecheck` | TypeScript check |
| `npm run build:android` | Production Android build on EAS |
| `npm run deploy:android` | Build and submit to Google Play |

## License

See [LICENSE.md](LICENSE.md). Privacy policy: [PRIVACY.md](PRIVACY.md).
