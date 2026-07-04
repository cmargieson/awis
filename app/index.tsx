import { useMemo, useState } from 'react'
import { YStack } from 'tamagui'

import Results from '../components/features/results'
import Search from '../components/features/search'

import DATA from '../assets/data/data.json'

export default function IndexScreen() {
  const [input, setInput] = useState('')

  const results = useMemo(
    () =>
      DATA.filter(
        (item) =>
          item.name.toLowerCase().includes(input.toLowerCase()) ||
          item.identifier.toLowerCase().includes(input.toLowerCase())
      ),
    [input]
  )

  return (
    <YStack flex={1} gap="$3" px="$3" pt="$3">
      <Search setInput={setInput} />
      <Results results={results} />
    </YStack>
  )
}
