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
      <YStack>
        {results.map((item, index) => (
          <YStack key={item.identifier}>
            {index > 0 && <Separator />}
            <ListItem
              title={item.name}
              subTitle={
                <XStack width="100%" alignItems="center">
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
