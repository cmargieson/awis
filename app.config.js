/** @type {import('expo/config').ExpoConfig} */
const base = require('./app.json').expo

const isDevelopmentBuild = process.env.EAS_BUILD_PROFILE === 'development'

/** @param {import('expo/config').ExpoConfig} config */
module.exports = ({ config }) => {
  const plugins = (config.plugins ?? base.plugins).filter((plugin) => {
    const name = Array.isArray(plugin) ? plugin[0] : plugin
    return isDevelopmentBuild || name !== 'expo-dev-client'
  })

  return {
    ...config,
    ...base,
    plugins,
  }
}
