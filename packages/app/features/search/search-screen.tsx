import { Input, YStack } from '@my/ui'
import { useState, useEffect } from 'react'

import { ItemList } from './item-list'

import data from '../../assets/data.json'

export function SearchScreen() {
  const [filteredArray, setFilteredArray] = useState<
    | {
        state: string
        name: string
        identifier: string
        taf: boolean
        taf3: boolean
        cilometer: boolean
        vismeter: boolean
        phone: string
      }[]
  >([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setFilteredArray(() =>
      data.filter(
        (item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.identifier.toLowerCase().includes(inputValue.toLowerCase())
      )
    )
  }, [inputValue])

  return (
    <YStack margin="$3" space="$3">
      <Input onChangeText={setInputValue} placeholder="Search..." />
      <ItemList filteredArray={filteredArray} />
    </YStack>
  )
}
