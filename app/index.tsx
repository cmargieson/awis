import { useState, useEffect } from "react";
import { YStack } from "tamagui";

import Results from "./features/results";
import Search from "./features/search";

import DATA from "../assets/data/data.json";

export default function IndexScreen() {
  const [results, setResults] = useState<
    | {
        state: string;
        name: string;
        identifier: string;
        taf: boolean;
        taf3: boolean;
        cilometer: boolean;
        vismeter: boolean;
        phone: string;
      }[]
  >([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    setResults(() =>
      DATA.filter(
        (item) =>
          item.name.toLowerCase().includes(input.toLowerCase()) ||
          item.identifier.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input]);

  return (
    <YStack gap="$3" px="$3" pt="$3">
      <Search setInput={setInput} />
      <Results results={results} />
    </YStack>
  );
}
