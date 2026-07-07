/**
 * Scrollable list of aerodromes. Each row is tappable and opens the phone dialer.
 *
 * Data flow: IndexScreen filters DATA → passes `results` prop → we render with .map().
 * We do not fetch or filter here; this component only displays what it is given.
 */
import { Linking } from 'react-native'
import { ListItem, ScrollView, SizableText, XStack, YStack } from 'tamagui'

import type { Aerodrome } from '../../types/aerodrome'

type ResultsProps = {
  results: Aerodrome[]
}

/**
 * Opens the device dialer. Phone strings in JSON include spaces and brackets;
 * tel: URLs work more reliably with digits only.
 */
function dialPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits) {
    Linking.openURL(`tel:${digits}`)
  }
}

export default function Results({ results }: ResultsProps) {
  return (
    // flex={1} fills space below the search bar so only this area scrolls
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      {/* gap="$2" adds space between each card (see per-item YStack below) */}
      <YStack gap="$2">
        {/* key must be stable and unique — identifier is the ICAO code */}
        {results.map((item) => (
          <YStack
            key={item.identifier}
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            overflow="hidden"
            backgroundColor="$background"
          >
            {/* subTitle accepts JSX — custom row with ICAO left, phone right */}
            <ListItem
              size="$4"
              title={item.name}
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
        ))}
      </YStack>
    </ScrollView>
  )
}
