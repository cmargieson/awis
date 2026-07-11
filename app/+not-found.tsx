/**
 * Fallback screen when the user navigates to a route that does not exist.
 *
 * The "+" prefix is Expo Router’s convention for special files (like
 * +not-found and +html). Link href="/" sends them back to app/index.tsx.
 */
import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'
import { View, Text } from 'tamagui'

export default function NotFoundScreen() {
  return (
    <>
      {/* Override the stack header title for this screen only */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View margin={10}>
        <Text>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  )
}

// StyleSheet.create is React Native’s usual way to define reusable styles
const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
})
