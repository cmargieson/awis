import type { ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { TamaguiProvider } from 'tamagui'
import { config } from '../tamagui.config'

type ProviderProps = {
  children: ReactNode
}

export function Provider({ children }: ProviderProps) {
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
