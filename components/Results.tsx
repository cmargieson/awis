/**
 * Scrollable list of aerodromes. Each row is tappable and opens the phone dialer.
 *
 * Data flow: IndexScreen filters DATA → passes `results` prop → we render with FlatList.
 * We do not fetch or filter here; this component only displays what it is given.
 */
import { FlatList, Linking } from 'react-native'
import { ListItem, SizableText, XStack, YStack } from 'tamagui'

import type { Aerodrome } from '../types/aerodrome'

type ResultsProps = {
  results: Aerodrome[]
}

/**
 * Opens the device dialer. Phone strings in JSON include spaces and brackets;
 * tel: URLs work more reliably with digits only.
 */
async function dialPhone(phone: string) {
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

function AerodromeRow({ item }: { item: Aerodrome }) {
  return (
    <YStack
      borderRadius="$4"
      borderWidth={1}
      borderColor="$borderColor"
      overflow="hidden"
      backgroundColor="$background"
      marginBottom="$2"
    >
      {/* subTitle accepts JSX — custom row with ICAO left, phone right */}
      <ListItem
        size="$4"
        title={item.name}
        accessibilityRole="button"
        accessibilityLabel={`Call AWIS for ${item.name}`}
        subTitle={
          <XStack
            flex={1}
            alignSelf="stretch"
            justifyContent="space-between"
            alignItems="center"
            mt="$1"
            gap="$3"
          >
            <SizableText
              size="$3"
              color="$color"
              opacity={0.6}
              flexShrink={1}
              numberOfLines={1}
            >
              {item.identifier}
            </SizableText>
            <SizableText
              size="$3"
              color="$color"
              opacity={0.6}
              flexShrink={0}
              textAlign="right"
            >
              {item.phone}
            </SizableText>
          </XStack>
        }
        onPress={() => dialPhone(item.phone)}
      />
    </YStack>
  )
}

export default function Results({ results }: ResultsProps) {
  if (results.length === 0) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" px="$4">
        <SizableText size="$4" color="$color" opacity={0.6} textAlign="center">
          No aerodromes found
        </SizableText>
      </YStack>
    )
  }

  // flex={1} fills space below the search bar so only this area scrolls
  return (
    <FlatList
      style={{ flex: 1 }}
      data={results}
      keyExtractor={(item) => item.identifier}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <AerodromeRow item={item} />}
    />
  )
}
