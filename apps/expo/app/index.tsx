import { Button } from '@my/ui'
import { Search } from '@tamagui/lucide-icons'
import { Stack } from 'expo-router'
import { useLink } from 'solito/link'

import { HomeScreen } from 'app/features/home/home-screen'

export default function Screen() {
  const linkProps = useLink({
    href: '/search',
  })

  return (
    <>
      <Stack.Screen
        options={{
          title: 'AWIS',
          headerRight: () => (
            <Button {...linkProps} icon={<Search />}>
              Search
            </Button>
          ),
        }}
      />
      <HomeScreen />
    </>
  )
}
