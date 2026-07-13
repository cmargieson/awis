/**
 * Babel transforms modern JS/TS/JSX into code the JS engine can run.
 * Expo’s preset handles React Native; Unistyles’ plugin binds styles to native
 * views. reanimated/plugin must stay last in the plugins list.
 */
module.exports = (api) => {
  // Cache the config so Babel does not recompute it on every file
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'react-native-unistyles/plugin',
        {
          // Process app/ routes; also process any file that imports Unistyles
          // (covers components/ outside app/)
          root: 'app',
          autoProcessImports: ['react-native-unistyles'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
