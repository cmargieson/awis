// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config').MetroConfig}
 */
const { getDefaultConfig } = require('expo/metro-config')
const { withTamagui } = require('@tamagui/metro-plugin')

const config = withTamagui(getDefaultConfig(__dirname), {
  components: ['tamagui'],
  config: './tamagui.config.ts',
})

config.resolver.sourceExts.push('mjs')

module.exports = config
