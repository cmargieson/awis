/**
 * Metro is the bundler that packs JS/assets for React Native / Expo.
 * Learn more: https://docs.expo.io/guides/customizing-metro
 *
 * @type {import('expo/metro-config').MetroConfig}
 */
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

// Allow importing .mjs modules (some npm packages ship only that extension)
config.resolver.sourceExts.push('mjs')

module.exports = config
