import { Linking } from "react-native";
import { ListItem, ScrollView, Separator, Group } from "tamagui";

export default function Results({ results }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Group separator={<Separator />}>
        {results.map((item) => (
          <Result item={item} key={item.identifier} />
        ))}
      </Group>
    </ScrollView>
  );
}

function Result({ item }) {
  return (
    <Group.Item>
      <ListItem
        title={item.name}
        subTitle={item.identifier}
        onPress={() => Linking.openURL(`tel:${item.phone}`)}
      />
    </Group.Item>
  );
}
