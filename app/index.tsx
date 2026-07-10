/**
 * Home screen — search box + filtered list of aerodromes.
 *
 * Expo Router maps files under app/ to routes. This file is app/index.tsx,
 * so it becomes the "/" screen (the first tab/stack screen users see).
 */
import { useMemo, useState } from 'react'
import { YStack } from 'tamagui'

import Results from '../components/Results'
import Search from '../components/Search'
import type { Aerodrome } from '../types/aerodrome'

// Bundled at build time: the whole JSON file is included in the app binary
import DATA from '../assets/data/data.json'

const AERODROMES = DATA as Aerodrome[]

export default function IndexScreen() {
  // State: when input changes, React re-renders this component and children
  const [input, setInput] = useState('')

  /*
   * useMemo recalculates the filtered list only when `input` changes.
   * Without it we'd still filter on every render, but useMemo makes the
   * dependency explicit and avoids redoing work when unrelated state updates.
   */
  const results = useMemo(
    () =>
      AERODROMES.filter(
        (item) =>
          item.name.toLowerCase().includes(input.toLowerCase()) ||
          item.identifier.toLowerCase().includes(input.toLowerCase())
      ),
    [input]
  )

  return (
    /*
     * YStack = vertical stack (column). flex={1} fills the screen height.
     * gap / px / pt / pb are Tamagui spacing tokens from tamagui.config.ts
     */
    <YStack flex={1} gap="$4" px="$3" pt="$3" pb="$3">
      <Search value={input} setInput={setInput} />
      <Results results={results} />
    </YStack>
  )
}
