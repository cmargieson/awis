/**
 * Unistyles bootstrap — must load before any screen StyleSheets (see index.ts).
 *
 * adaptiveThemes follows the system light/dark setting without a React provider.
 */
import { StyleSheet } from 'react-native-unistyles'

const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#111111',
    textMuted: '#666666',
    border: '#cccccc',
    accent: '#0091ff',
  },
}

const darkTheme = {
  colors: {
    background: '#000000',
    text: '#ffffff',
    textMuted: '#999999',
    border: '#333333',
    accent: '#3b9eff',
  },
}

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
}

type AppThemes = typeof appThemes

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: appThemes,
  settings: {
    adaptiveThemes: true,
  },
})
