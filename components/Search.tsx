/**
 * Controlled search input — the parent owns the text; this component only
 * reports changes via setInput.
 *
 * "Controlled component": value lives in IndexScreen's useState, not inside
 * TextInput. That lets the same input drive filtering in useMemo on the parent.
 */
import { TextInput } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

type SearchProps = {
  /** Current search text owned by the parent */
  value: string
  /** Callback React Native fires on every keystroke with the new string */
  setInput: (value: string) => void
}

export default function Search({ value, setInput }: SearchProps) {
  const { theme } = useUnistyles()

  return (
    <TextInput
      style={styles.input}
      value={value}
      // onChangeText (RN) passes the new string; onChange (web) would pass an event
      onChangeText={setInput}
      placeholder="Search aerodromes"
      placeholderTextColor={theme.colors.textMuted}
    />
  )
}

const styles = StyleSheet.create((theme) => ({
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
}))
