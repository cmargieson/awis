/**
 * Babel transforms modern JS/TS/JSX into code the JS engine can run.
 * Expo’s preset handles React Native. reanimated/plugin must stay last.
 */
module.exports = (api) => {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: ['react-native-reanimated/plugin'],
  }
}
