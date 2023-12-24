import { XStack, Text, Button, YStack } from '@my/ui'
import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

import { ItemList } from '../search/item-list'

import { getRecents, deleteRecents } from '../functions'

export function HomeScreen() {
  const [recents, setRecents] = useState([])

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getRecents().then((recents) => setRecents(recents))
    }
  }, [isFocused])

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
