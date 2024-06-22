import AsyncStorage from "@react-native-async-storage/async-storage";
import saveLevel from "../api/saveLevel";

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

export const setDailyChallengeCompleted = async (date) => {
  try {
    // Read the current winning state from AsyncStorage
    const storedWinningState = await AsyncStorage.getItem(
      "dailyWordWinningState"
    );

    // Parse the retrieved state to an array
    let winningState = storedWinningState ? JSON.parse(storedWinningState) : [];

    // Check if the date already exists to avoid duplicates
    if (!winningState.includes(date)) {
      // Add the new date to the array
      winningState.push(date);

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem(
        "dailyWordWinningState",
        JSON.stringify(winningState)
      );

      console.log("Winning state updated:", winningState);
    } else {
      console.log("Date already exists in winning state:", date);
    }
  } catch (error) {
    console.error("Failed to save winning state:", error);
  }
};

export const gettDailyChallengeCompleted = async () => {
  try {
    const storedWinningState = await AsyncStorage.getItem(
      "dailyWordWinningState"
    );
    let winningState = storedWinningState ? JSON.parse(storedWinningState) : [];
    console.log("Current winning state:", winningState);
    return winningState;
  } catch (error) {
    console.error("Failed to get winning state:", error);
    return [];
  }
};

export const setLevelCompleted = async (level) => {
  try {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    // Read the current winning state from AsyncStorage
    const storedWinningState = await AsyncStorage.getItem("levelWinningState");

    // Parse the retrieved state to an array
    let winningState = level;

    // Check if the date already exists to avoid duplicates
    if (winningState !== storedWinningState) {
      try {
        // Save the updated array back to AsyncStorage
        await AsyncStorage.setItem(
          "levelWinningState",
          JSON.stringify(winningState)
        );
        if (user) await saveLevel(winningState);

        console.log("Level updated:", winningState);
      } catch (error) {
        console.error("Failed to save winning state:", error);
      }
    } else {
      console.log("Level already cleared:", level);
    }
  } catch (error) {
    console.error("Failed to save level state:", error);
  }
};

export const getLevelCompleted = async () => {
  try {
    const storedWinningState = await AsyncStorage.getItem("levelWinningState");
    let winningState = storedWinningState ? JSON.parse(storedWinningState) : 1;
    console.log("Current level:", winningState);
    return winningState;
  } catch (error) {
    console.error("Failed to get winning state:", error);
    return [];
  }
};
