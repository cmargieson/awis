import { Button, ListItem, Separator } from '@my/ui'
import { Phone } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { FlatList, Linking } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  const updateRecents = async (value) => {
    try {
      const oldData = await AsyncStorage.getItem('@recents')
      const data = oldData != null ? JSON.parse(oldData) : []
      data.unshift(value)
      const jsonValue = JSON.stringify(data)
      await AsyncStorage.setItem('@recents', jsonValue)
    } catch (e) {}
  }

  return (
    <ListItem
      title={item.name}
      subTitle={item.identifier}
      iconAfter={
        <Button
          iconAfter={<Phone />}
          onPress={() => {
            updateRecents(item)
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
