/**
 * Dynamic Expo config — runs in Node.js when you start Metro or run EAS Build.
 *
 * app.json holds static settings (name, icons, package id). This file can
 * change those settings based on environment variables so one codebase produces
 * different native apps (development vs store) without maintaining two configs.
 */
/** @type {import('expo/config').ExpoConfig} */
const base = require('./app.json').expo

// EAS sets this when building: "development" | "production" | etc.
const isDevelopmentBuild = process.env.EAS_BUILD_PROFILE === 'development'

/** @param {import('expo/config').ExpoConfig} config */
module.exports = ({ config }) => {
  // expo-dev-client is only needed for development builds (custom dev app).
  // Store builds should not include it — users get a normal release app.
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
