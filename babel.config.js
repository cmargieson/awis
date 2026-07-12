/**
 * Babel transforms modern JS/TS/JSX into code the JS engine can run.
 * Expo’s preset handles React Native; Tamagui’s plugin optimizes UI at build
 * time (options come from tamagui.build.ts). reanimated/plugin must stay last
 * in the plugins list.
 */
module.exports = (api) => {
  // Cache the config so Babel does not recompute it on every file
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      '@tamagui/babel-plugin',
      'react-native-reanimated/plugin',
    ],
  }
}
