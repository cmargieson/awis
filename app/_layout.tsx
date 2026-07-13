/**
 * Root layout — wraps every screen in the app.
 *
 * Expo Router calls this once at the top of the tree. Responsibilities here:
 * - Hide the splash screen once JS is ready
 * - Provide navigation themes
 * - Define the stack navigator and header title
 *
 * Files in app/ become routes; files outside app/ (components/, types/) do not.
 */
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router/react-navigation'
import { SplashScreen, Stack } from 'expo-router'

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
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
    </ThemeProvider>
  )
}
