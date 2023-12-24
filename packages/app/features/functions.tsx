import AsyncStorage from '@react-native-async-storage/async-storage'

export const addRecent = async (value) => {
  try {
    const oldData = await AsyncStorage.getItem('@recents')
    const data = oldData != null ? JSON.parse(oldData) : []
    data.unshift(value)
    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem('@recents', jsonValue)
  } catch (e) {}
}

export const getRecents = async () => {
  try {
    const jsonData = await AsyncStorage.getItem('@recents')
    const data = jsonData != null ? JSON.parse(jsonData) : []
    let uniq = data.filter(
      ({ identifier }, index, a) => a.findIndex((e) => identifier === e.identifier) === index
    )
    return uniq
  } catch (e) {}
}

export const deleteRecents = async () => {
    try {
      await AsyncStorage.removeItem('@recents')
    } catch (e) {}
  }

