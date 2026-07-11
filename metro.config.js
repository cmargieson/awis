/**
 * Metro is the bundler that packs JS/assets for React Native / Expo.
 * We start from Expo’s defaults, then wrap with Tamagui’s Metro plugin so
 * theme tokens and components resolve correctly. Learn more:
 * https://docs.expo.io/guides/customizing-metro
 *
 * @type {import('expo/metro-config').MetroConfig}
 */
const { getDefaultConfig } = require('expo/metro-config')
const { withTamagui } = require('@tamagui/metro-plugin')

const config = withTamagui(getDefaultConfig(__dirname), {
  components: ['tamagui'],
  config: './tamagui.config.ts',
})

// Allow importing .mjs modules (some npm packages ship only that extension)
config.resolver.sourceExts.push('mjs')

module.exports = config
