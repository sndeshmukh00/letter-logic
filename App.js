import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { COLORS } from "./src/constants";
import SafeViewAndroid from "./src/safeViewAndroid";
import Keyboard from "./src/components/Keyboard";
import { useState } from "react";

export default function App() {
  const word = "hello";
  const letters = word.split("");
  const complexity = 1; // 1 - easy, 2 - medium, 3 - hard

  // const rows = new Array(complexity).fill(null);
  const [rows, setRows] = useState(
    new Array(Math.ceil(letters.length / complexity)).fill(
      new Array(letters.length).fill("")
    )
  );
  // For keeping track of current cell
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCell, setCurrentCell] = useState(0);

  // as useState array cant be modified directly we are cloning it
  const cloneArray = (arr) => {
    // because arrays are passed by reference and array is 3d array we are destructuring both row and cell
    return [...arr.map((row) => [...row])];
  };

  // Checking for active cell
  const isCellActive = (row, cell) => {
    return row === currentRow && cell === currentCell;
  };

  // handling/setting letters on key press
  const onKeyPressed = (key) => {
    if (currentRow > rows.length - 1) {
      return;
    }
    const updatedRows = cloneArray(rows);
    updatedRows[currentRow][currentCell] = key;
    setRows(updatedRows);
    if (currentCell < letters.length - 1) {
      setCurrentCell(currentCell + 1);
    } else if (currentCell === letters.length - 1) {
      setCurrentCell(0);
      setCurrentRow(currentRow + 1);
    }
  };
  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, styles.container]}>
      <StatusBar style="light" />

      <Text style={styles.title}>Letter Logic</Text>

      <ScrollView style={styles.board}>
        {rows.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((letter, cellIndex) => (
              <View
                key={`cell-${rowIndex}-${cellIndex}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(rowIndex, cellIndex)
                      ? COLORS.lightgrey
                      : COLORS.darkgrey,
                  },
                ]}
              >
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
