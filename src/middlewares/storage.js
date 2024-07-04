import AsyncStorage from "@react-native-async-storage/async-storage";

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
  };

  if (action.type === "LOGOUT_USER") {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(initialUserData));
    } catch (e) {
      console.error("Failed to remove user data", e);
    }
  }

  const actionsToSave = [
    "SET_USER_DATA",
    "UPDATE_COINS",
    "UPDATE_LEVEL",
    "SYNC_LOCAL_TO_ONLINE",
  ];

  if (actionsToSave.includes(action.type)) {
    const state = store.getState();
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(state.user));
    } catch (e) {
      console.error("Failed to save user data", e);
    }
  }

  return result;
};

export default storageMiddleware;
