import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/Navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent style="light" hidden />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
