import { XStack, Text, Button, YStack } from '@my/ui'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

import { ItemList } from '../item-list'

export function HomeScreen() {
  const [recents, setRecents] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      readRecents()
    }
  }, [isFocused])

  const readRecents = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('@recents')
      const data = jsonData != null ? JSON.parse(jsonData) : []
      let uniq = data.filter(
        ({ identifier }, index, a) => a.findIndex((e) => identifier === e.identifier) === index
      )
      setRecents(uniq)
    } catch (e) {}
  }

  const deleteRecents = async () => {
    try {
      await AsyncStorage.removeItem('@recents')
    } catch (e) {}
  }

  return (
    <YStack margin="$3" space="$3">
      <RecentsHeader deleteRecents={deleteRecents} recents={recents} setRecents={setRecents} />
      <ItemList filteredArray={recents} />
    </YStack>
  )
}

function RecentsHeader({ deleteRecents, recents, setRecents }) {
  if (!recents.length) {
    
    return <></>
  }

  return (
    <XStack alignItems="center">
      <Text flex={1}>Recents</Text>
      <Button
        onPress={() => {
          deleteRecents()
          setRecents([])
        }}
        unstyled
      >
        CLEAR
      </Button>
    </XStack>
  )
}
