import { Linking } from 'react-native'
import { ListItem, ScrollView, Separator, SizableText, XStack, YStack } from 'tamagui'

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
