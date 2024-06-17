import AsyncStorage from "@react-native-async-storage/async-storage";

export default usePersistGame = async (
  rows,
  currentRow,
  currentCell,
  gameState
) => {
  const data = {
    rows,
    currentRow: currentRow,
    currentCell: currentCell,
    gameState,
  };

  const dataString = JSON.stringify(data);
  await AsyncStorage.setItem("@game", dataString);
};

export const usePersistedData = async () => {
  return await AsyncStorage.getItem("@game")
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((err) => console.log("Could not read data: ", err));
};
