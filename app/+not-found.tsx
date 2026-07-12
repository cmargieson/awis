/**
 * Fallback screen when the user navigates to a route that does not exist.
 *
 * The "+" prefix is Expo Router’s convention for special files (like
 * +not-found and +html). Link href="/" sends them back to app/index.tsx.
 */
import { Link, Stack } from 'expo-router'
import { SizableText, YStack } from 'tamagui'

export default function NotFoundScreen() {
  return (
    <>
      {/* Override the stack header title for this screen only */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      <YStack m="$3" gap="$2">
        <SizableText size="$4" color="$color">
          This screen doesn't exist.
        </SizableText>
        <Link href="/">
          <SizableText size="$4" color="$blue10" mt="$3" py="$3">
            Go to home screen!
          </SizableText>
        </Link>
      </YStack>
    </>
  )
}
