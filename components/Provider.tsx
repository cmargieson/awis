/**
 * Wraps the app in TamaguiProvider so UI components can use themes and tokens.
 *
 * "Provider" pattern: put shared context at the top of the tree; descendants
 * read it without prop-drilling. Here we only pass `children` — everything
 * inside (screens, lists) automatically gets Tamagui styling.
 */
import type { ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { config } from '../tamagui.config'

type ProviderProps = {
  /** Anything nested inside this component (the whole app UI) */
  children: ReactNode
}

export function Provider({ children }: ProviderProps) {
  // "light" | "dark" | null — follows the phone's system setting
  const colorScheme = useColorScheme()

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}
    >
      {children}
    </TamaguiProvider>
  )
}
