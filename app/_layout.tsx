/**
 * Root layout — wraps every screen in the app.
 *
 * Expo Router calls this once at the top of the tree. Responsibilities here:
 * - Load Uniwind global CSS
 * - Hide the splash screen once JS is ready
 * - Provide navigation themes from the Reusables theme
 * - Host portals for overlay components
 * - Define the stack navigator and header title
 */
import '@/global.css'

import { PortalHost } from '@rn-primitives/portal'
import { ThemeProvider } from 'expo-router/react-navigation'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { useUniwind } from 'uniwind'

import { NAV_THEME } from '@/lib/theme'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'index',
}

// Keep the native splash visible until the root layout mounts
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const { theme } = useUniwind()

  return (
    <ThemeProvider value={NAV_THEME[theme === 'dark' ? 'dark' : 'light']}>
      <StatusBar style="auto" />
      <Stack>
        {/*
         * name="index" matches app/index.tsx — options.title is the header text
         */}
        <Stack.Screen
          name="index"
          options={{
            title: 'AWIS Phonebook',
          }}
        />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  )
}
