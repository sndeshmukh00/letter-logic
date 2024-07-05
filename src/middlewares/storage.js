import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateCoinsAPI, updateLevelAPI } from "../api/saveData";

const storageMiddleware = (store) => (next) => async (action) => {
  const result = next(action);
  //   console.log("from storage middleware", action, "store - ", store);
  const initialUserData = {
    _id: "",
    coins: 500,
    dailyChallenge: [],
    email: "",
    level: 1,
    name: "guest",
    streak: 0,
    hints: 2,
  };

  if (action.type === "LOGOUT_USER") {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(initialUserData));
      await AsyncStorage.removeItem("@token");
    } catch (e) {
      console.error("Failed to remove user data", e);
    }
  }

  const actionsToSave = [
    "SET_USER_DATA",
    "UPDATE_COINS",
    "UPDATE_LEVEL",
    "UPDATE_DAILYCHALLENGE",
    "UPDATE_HINTS",
    "SYNC_LOCAL_TO_ONLINE",
  ];

  if (actionsToSave.includes(action.type)) {
    const state = store.getState();
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(state.user));
      if (state.isLoggedIn) {
        switch (action.type) {
          case "UPDATE_COINS":
            await updateCoinsAPI(action.payload, state.user.email);
            break;
          case "UPDATE_LEVEL":
            await updateLevelAPI(state.user.level, state.user.email);
            break;
          case "UPDATE_DAILYCHALLENGE":
            await updateDailyChallengeAPI(state.user.dailyChallenge);
            break;
          case "UPDATE_HINTS":
            // TODO: Add API call to update hints
            // await updateHintsAPI(state.user.hints);
            break;
          default:
            break;
        }
      }
    } catch (e) {
      console.error("Failed to save user data", e);
    }
  }

  return result;
};

export default storageMiddleware;
