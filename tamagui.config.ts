/**
 * Tamagui design-system config (colors, spacing tokens, fonts, themes).
 *
 * Components like YStack and Input read tokens such as "$4" or "$borderColor"
 * from this config. Provider.tsx passes it to TamaguiProvider so the whole
 * app shares one theme.
 *
 * v5 splits animations out of the base config; we use Reanimated for native.
 * onlyAllowShorthands is off so existing long-form style props keep typing.
 */
import { defaultConfig } from '@tamagui/config/v5'
import { animations } from '@tamagui/config/v5-reanimated'
import { createTamagui } from 'tamagui'

export const config = createTamagui({
  ...defaultConfig,
  animations,
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
    styleCompat: 'react-native',
  },
})

export default config

export type Conf = typeof config

// Tells TypeScript that Tamagui components know about our custom config
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
