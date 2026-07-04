import { Input } from 'tamagui'

type SearchProps = {
  setInput: (value: string) => void
}

export default function Search({ setInput }: SearchProps) {
  return (
    <Input
      size="$4"
      borderRadius="$4"
      borderWidth={1}
      onChangeText={setInput}
      placeholder="Search aerodromes"
    />
  )
}
