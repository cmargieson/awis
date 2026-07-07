/**
 * Root layout — wraps every screen in the app.
 *
 * Expo Router calls this once at the top of the tree. Responsibilities here:
 * - Load fonts before showing UI
 * - Provide Tamagui + navigation themes
 * - Define the stack navigator and header title
 *
 * Files in app/ become routes; files outside app/ (components/, types/) do not.
 */
import '../tamagui-web.css'

import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router/react-navigation'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from '../components/Provider'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'index',
}

// Keep the native splash visible until fonts are ready (see useEffect below)
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  /*
   * useFonts returns [loaded, error]. require() tells Metro to bundle the .otf
   * files. Until loaded is true, we render nothing so users don't see a flash
   * of wrong fonts.
   */
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    /*
     * Provider order matters: outer providers wrap inner ones.
     * Tamagui (UI) → React Navigation theme (header colors) → Stack (screens)
     */
    <Provider>
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
    </Provider>
  )
}
