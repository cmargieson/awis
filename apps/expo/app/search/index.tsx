import { Stack } from 'expo-router'

import { SearchScreen } from 'app/features/search/search-screen'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Search',
        }}
      />
      <SearchScreen />
    </>
  )
}
