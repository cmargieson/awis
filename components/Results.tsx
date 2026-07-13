/**
 * Scrollable list of aerodromes. Each row is tappable and opens the phone dialer.
 *
 * Data flow: IndexScreen filters DATA → passes `results` prop → we render with ScrollView.
 * We do not fetch or filter here; this component only displays what it is given.
 */
import { Linking, Pressable, ScrollView, Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import type { Aerodrome } from '../types/aerodrome'

type ResultsProps = {
  results: Aerodrome[]
}

/**
 * Opens the device dialer with a tel: URL.
 *
 * Phone strings in JSON include spaces and brackets; strip non-digits so the
 * URL is reliable. We call openURL directly (no canOpenURL check): on Android
 * 11+, canOpenURL('tel:...') returns false unless the app declares a tel
 * intent query, which would silently block dialing.
 */
async function dialPhone(phone: string) {
  // \D = "not a digit" — keep 0–9 only
  const digits = phone.replace(/\D/g, '')
  if (!digits) {
    return
  }

  const url = `tel:${digits}`
  try {
    await Linking.openURL(url)
  } catch {
    // Dialer unavailable (e.g. web) — ignore
  }
}

/** One aerodrome card: name, ICAO code, phone; tap calls dialPhone. */
function AerodromeRow({ item }: { item: Aerodrome }) {
  return (
    <Pressable
      style={styles.row}
      accessibilityRole="button"
      accessibilityLabel={`Call AWIS for ${item.name}`}
      onPress={() => dialPhone(item.phone)}
    >
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.meta}>
        <Text style={styles.metaText} numberOfLines={1}>
          {item.identifier}
        </Text>
        <Text style={[styles.metaText, styles.phone]}>{item.phone}</Text>
      </View>
    </Pressable>
  )
}

export default function Results({ results }: ResultsProps) {
  // Empty state when the search filter matches nothing
  if (results.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No aerodromes found</Text>
      </View>
    )
  }

  /*
   * ScrollView + map fills space below the search bar so only this area
   * scrolls. identifier (ICAO) is unique in our data and used as key.
   */
  return (
    <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
      {results.map((item) => (
        <AerodromeRow key={item.identifier} item={item} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create((theme) => ({
  list: {
    flex: 1,
  },
  row: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    fontSize: 16,
    color: theme.colors.text,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    gap: 12,
  },
  metaText: {
    fontSize: 14,
    color: theme.colors.textMuted,
    flexShrink: 1,
  },
  phone: {
    flexShrink: 0,
    textAlign: 'right',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
}))
