import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/Navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/store/store.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function App() {
  // Setting AsyncStorage if app loaded for the first time
  const initialUserData = {
    _id: "",
    coins: 500,
    dailyChallenge: [],
    email: "",
    level: 1,
    name: "guest",
    streak: 0,
  };

  const setInitialData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (!userData) {
      await AsyncStorage.setItem("userData", JSON.stringify(initialUserData));
    }
  };
  useEffect(() => {
    setInitialData();
  });
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar translucent style="light" hidden />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
