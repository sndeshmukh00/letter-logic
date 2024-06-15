import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { COLORS } from "./src/constants";
import Home from "./src/Screens/Home";
import MainGame from "./src/Screens/MainGame";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent style="light" hidden />

      {/* <Home /> */}
      <MainGame />
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
  title: {
    color: COLORS.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 5,
  },
  board: {
    alignSelf: "stretch",
    height: 100,
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  cell: {
    borderColor: COLORS.darkgrey,
    flex: 1,
    aspectRatio: 1,
    borderWidth: 2,
    margin: 3,
    maxWidth: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    color: COLORS.lightgrey,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
