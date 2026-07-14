/**
 * Home screen — search box + filtered list of aerodromes.
 *
 * Expo Router maps files under app/ to routes. This file is app/index.tsx,
 * so it becomes the "/" screen (the first tab/stack screen users see).
 */
import { useMemo, useState } from 'react'
import { Linking, ScrollView, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import type { Aerodrome } from '@/types/aerodrome'

// Bundled at build time: the whole JSON file is included in the app binary
import DATA from '@/assets/data/data.json'

const AERODROMES = DATA as Aerodrome[]

/**
 * Opens the device dialer with a tel: URL.
 *
 * Phone strings in JSON include spaces and brackets; strip non-digits so the
 * URL is reliable. We call openURL directly (no canOpenURL check): on Android
 * 11+, canOpenURL('tel:...') returns false unless the app declares a tel
 * intent query, which would silently block dialing.
 */
async function dialPhone(phone: string) {
  // \D = "not a digit" — keep 0–9 only
  const digits = phone.replace(/\D/g, '')
  if (!digits) {
    return
  }

  const url = `tel:${digits}`
  try {
    await Linking.openURL(url)
  } catch {
    // Dialer unavailable (e.g. web) — ignore
  }
}

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
    <View className="flex-1 gap-4 px-3 pb-3 pt-3">
      <Input
        value={input}
        onChangeText={setInput}
        placeholder="Search aerodromes"
        accessibilityLabel="Search aerodromes"
      />

      {results.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <Text variant="muted" className="text-center text-base">
            No aerodromes found
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {results.map((item) => (
            <Button
              key={item.identifier}
              variant="ghost"
              className="mb-2 h-auto w-full p-0"
              accessibilityLabel={`Call AWIS for ${item.name}`}
              onPress={() => dialPhone(item.phone)}
            >
              <Card className="w-full gap-1 py-3.5">
                <CardHeader className="gap-1 px-4">
                  <CardTitle className="text-base font-normal">{item.name}</CardTitle>
                  <View className="mt-1 flex-row items-center justify-between gap-3">
                    <CardDescription className="shrink" numberOfLines={1}>
                      {item.identifier}
                    </CardDescription>
                    <CardDescription className="shrink-0 text-right">
                      {item.phone}
                    </CardDescription>
                  </View>
                </CardHeader>
              </Card>
            </Button>
          ))}
        </ScrollView>
      )}
    </View>
  )
}
