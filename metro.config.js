/**
 * Metro is the bundler that packs JS/assets for React Native / Expo.
 * Uniwind wraps the Expo config so Tailwind/CSS classes resolve at build time.
 *
 * @type {import('expo/metro-config').MetroConfig}
 */
const { getDefaultConfig } = require('expo/metro-config')
const { withUniwindConfig } = require('uniwind/metro')

const config = getDefaultConfig(__dirname)

// Allow importing .mjs modules (some npm packages ship only that extension)
config.resolver.sourceExts.push('mjs')

module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
  dtsFile: './uniwind-types.d.ts',
})
