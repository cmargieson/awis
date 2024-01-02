import { AlertDialog, Button, ListItem, Separator, Text, YGroup, XStack, YStack } from '@my/ui'
import { Phone } from '@tamagui/lucide-icons'
import { useState, useEffect } from 'react'
import { Linking } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { addRecent, getRecents, deleteRecents } from '../functions'

export const RecentItems = () => {
  const [recents, setRecents] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getRecents().then((recents) => setRecents(recents))
    }
  }, [isFocused])

  if (!recents.length) {
    return <></>
  }

  return (
    <YStack padding="$3" space="$2" alignItems="center">
      <Header setRecents={setRecents} />
      <Items recents={recents} />
    </YStack>
  )
}

const Items = ({ recents }) => {
  const listItems = recents.map((item) => (
    <YGroup.Item key={item.identifier}>
      <ListItem
        iconAfter={
          <Button
            accessibilityLabel={`Call ${item.name}`}
            iconAfter={<Phone />}
            onPress={() => {
              Linking.openURL(`tel:${item.phone}`)
              addRecent(item)
            }}
            size="$3"
          >
            Call
          </Button>
        }
        title={item.name}
        subTitle={item.identifier}
      />
    </YGroup.Item>
  ))

  return <YGroup separator={<Separator />}>{listItems}</YGroup>
}

const Header = ({ setRecents }) => {
  return (
    <XStack alignItems="center">
      <Text flex={1}>Recently called</Text>
      <AlertDialog native>
        <AlertDialog.Trigger asChild>
          <Button unstyled>Remove</Button>
        </AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            bordered
            elevate
            key="content"
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            x={0}
            scale={1}
            opacity={1}
            y={0}
          >
            <YStack space>
              <AlertDialog.Title>Remove</AlertDialog.Title>
              <AlertDialog.Description>
                Are you sure you want to remove all recently called items?
              </AlertDialog.Description>

              <XStack space="$3" justifyContent="flex-end">
                <AlertDialog.Cancel asChild>
                  <Button>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action
                  asChild
                  onPress={() => {
                    deleteRecents()
                    setRecents([])
                  }}
                >
                  <Button theme="active">Clear</Button>
                </AlertDialog.Action>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </XStack>
  )
}
