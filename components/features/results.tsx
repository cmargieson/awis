import { Linking } from 'react-native'
import { ListItem, ScrollView, Separator, XStack, YStack } from 'tamagui'

import type { Aerodrome } from '../../types/aerodrome'

type ResultsProps = {
  results: Aerodrome[]
}

function dialPhone(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits) {
    Linking.openURL(`tel:${digits}`)
  }
}

export default function Results({ results }: ResultsProps) {
  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false}>
      <YStack
        borderRadius="$4"
        borderWidth={1}
        borderColor="$borderColor"
        overflow="hidden"
        backgroundColor="$background"
      >
        {results.map((item, index) => (
          <YStack key={item.identifier}>
            {index > 0 && <Separator mx="$3" />}
            <ListItem
              size="$4"
              title={item.name}
              subTitle={
                <XStack width="100%" alignItems="center" mt="$1">
                  <ListItem.Subtitle>{item.identifier}</ListItem.Subtitle>
                  <ListItem.Subtitle ml="auto">{item.phone}</ListItem.Subtitle>
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
