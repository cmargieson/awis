import { Input } from "tamagui";

export default function Search({ setInput }) {
  return <Input onChangeText={setInput} placeholder="Search aerodromes" />;
}
