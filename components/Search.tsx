/**
 * Controlled search input — the parent owns the text; this component only
 * reports changes via setInput.
 *
 * "Controlled component": value lives in IndexScreen's useState, not inside
 * Input. That lets the same input drive filtering in useMemo on the parent.
 */
import { Input } from 'tamagui'

type SearchProps = {
  /** Current search text owned by the parent */
  value: string
  /** Callback React Native fires on every keystroke with the new string */
  setInput: (value: string) => void
}

export default function Search({ value, setInput }: SearchProps) {
  return (
    <Input
      size="$4"
      borderRadius="$4"
      borderWidth={1}
      value={value}
      onChangeText={setInput}
      placeholder="Search aerodromes"
    />
  )
}
