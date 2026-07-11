/**
 * Fallback screen when the user navigates to a route that does not exist.
 *
 * The "+" prefix is Expo Router’s convention for special files (like
 * +not-found and +html). Link href="/" sends them back to app/index.tsx.
 */
import { Link, Stack } from 'expo-router'
import { View, Text } from 'tamagui'

export default function NotFoundScreen() {
  return (
    <>
      {/* Override the stack header title for this screen only */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View margin={10}>
        <Text>This screen doesn't exist.</Text>
        <Link href="/">
          <Text mt={15} py={15} fontSize={14} color="#2e78b7">
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  )
}
