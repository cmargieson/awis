import { Linking } from 'react-native'
import { ListItem, ScrollView, Separator, YStack } from 'tamagui'

import type { Aerodrome } from '../types'

type ResultsProps = {
  results: Aerodrome[]
}

export default function Results({ results }: ResultsProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack>
        {results.map((item, index) => (
          <YStack key={item.identifier}>
            {index > 0 && <Separator />}
            <ListItem
              title={item.name}
              subTitle={item.identifier}
              onPress={() => Linking.openURL(`tel:${item.phone}`)}
            />
          </YStack>
        ))}
      </YStack>
    </ScrollView>
  )
}
