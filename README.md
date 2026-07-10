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

### Android development builds

Expo Go may not match this project's SDK. Use a development build instead:

1. Build once: `npm run build:android:dev`
2. Install the APK on your device/emulator when EAS finishes (or use the install link)
3. Start Metro: `npm run start:dev`
4. Open the AWIS development app and connect to the bundler

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo (clears cache) |
| `npm run start:dev` | Start Metro for a development build |
| `npm run lint` | Lint with Biome |
| `npm run typecheck` | TypeScript check |
| `npm run build:android:dev` | Android development APK on EAS |
| `npm run build:android` | Production Android build on EAS |

## License

See [LICENSE.md](LICENSE.md). Privacy policy: [PRIVACY.md](PRIVACY.md).
