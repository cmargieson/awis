import { Button, ListItem, Separator } from '@my/ui'
import { Phone } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { FlatList, Linking } from 'react-native'

import { addRecent } from '../functions'

export const ItemList = ({ filteredArray }) => {
  if (!filteredArray.length) {
    return <></>
  }

  return (
    <FlatList
      data={filteredArray}
      initialNumToRender={15}
      ItemSeparatorComponent={Separator}
      keyExtractor={(item) => item.identifier}
      removeClippedSubviews
      renderItem={({ item }) => <Item item={item} />}
      showsVerticalScrollIndicator={false}
    />
  )
}

const Item = memo(function Item({ item }) {
  return (
    <ListItem
      title={item.name}
      subTitle={item.identifier}
      iconAfter={
        <Button
          accessibilityLabel={`Call ${item.name}`}
          iconAfter={<Phone />}
          onPress={() => {
            addRecent(item)
            Linking.openURL(`tel:${item.phone}`)
          }}
          size="$3"
        >
          Call
        </Button>
      }
    />
  )
})
