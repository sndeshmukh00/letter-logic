import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { COLORS } from "./src/constants";
import SafeViewAndroid from "./src/safeViewAndroid";
import Keyboard from "./src/components/Keyboard";

export default function App() {
  const word = "hello";
  const letters = word.split("");
  const complexity = 1; // 1 - easy, 2 - medium, 3 - hard
  // const rows = new Array(complexity).fill(null);
  const rows = new Array(Math.ceil(letters.length / complexity)).fill(
    new Array(letters.length).fill("a")
  );

  const onKeyPressed = (key) => {
    console.warn(key);
  };
  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, styles.container]}>
      <StatusBar style="light" />

      <Text style={styles.title}>Letter Logic</Text>

      <ScrollView style={styles.board}>
        {rows.map((row) => (
          <View style={styles.row}>
            {row.map((letter) => (
              <View style={styles.cell}>
                <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Keyboard onKeyPressed={(key) => onKeyPressed(key)} />
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
