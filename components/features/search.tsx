import { Input } from 'tamagui'

type SearchProps = {
  setInput: (value: string) => void
}

export default function Search({ setInput }: SearchProps) {
  return <Input onChangeText={setInput} placeholder="Search aerodromes" />
}
