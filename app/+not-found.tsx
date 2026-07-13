/**
 * Fallback screen when the user navigates to a route that does not exist.
 *
 * The "+" prefix is Expo Router’s convention for special files (like
 * +not-found and +html). Link href="/" sends them back to app/index.tsx.
 */
import { Link, Stack } from 'expo-router'
import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

export default function NotFoundScreen() {
  return (
    <>
      {/* Override the stack header title for this screen only */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.text}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    margin: 12,
    gap: 8,
  },
  text: {
    fontSize: 16,
    color: theme.colors.text,
  },
  link: {
    marginTop: 12,
    paddingVertical: 12,
  },
  linkText: {
    fontSize: 16,
    color: theme.colors.accent,
  },
}))
