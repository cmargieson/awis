/**
 * Tamagui design-system config (colors, spacing tokens, fonts, themes).
 *
 * Components like YStack and Input read tokens such as "$4" or "$borderColor"
 * from this config. Provider.tsx passes it to TamaguiProvider so the whole
 * app shares one theme.
 */
import { config as configBase } from '@tamagui/config/v3'
import { createTamagui } from 'tamagui'

export const config = createTamagui(configBase)

export default config

export type Conf = typeof config

// Tells TypeScript that Tamagui components know about our custom config
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
