import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { COLORS } from "./src/constants";
import Home from "./src/Screens/Home";
import MainGame from "./src/Screens/MainGame";
import DailyChallenges from "./src/Screens/DailyChallenges";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent style="light" hidden />

      {/* <Home /> */}
      <DailyChallenges />
      {/* <MainGame /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: "center",
    // justifyContent: "center",
  },
});
