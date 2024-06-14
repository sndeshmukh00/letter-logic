import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { CLEAR, COLORS, ENTER } from "./src/constants";
import SafeViewAndroid from "./src/safeViewAndroid";
import Keyboard from "./src/components/Keyboard";
import { useEffect, useState } from "react";

export default function App() {
  const word = "hello";
  const letters = word.split("");
  const complexity = 1; // 1 - easy, 2 - medium, 3 - hard
  // For keeping track of current cell
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCell, setCurrentCell] = useState(0);

  // For handling Game Status
  const [gameState, setGameState] = useState("playing"); //won, lost, playing

  // const rows = new Array(complexity).fill(null);
  const [rows, setRows] = useState(
    new Array(Math.ceil(letters.length / complexity)).fill(
      new Array(letters.length).fill("")
    )
  );

  // as useState array cant be modified directly we are cloning it
  const cloneArray = (arr) => {
    // because arrays are passed by reference and array is 3d array we are destructuring both row and cell
    return [...arr.map((row) => [...row])];
  };

  // Checking for active cell
  const isCellActive = (row, cell) => {
    // if (gameState !== "playing") {
    //   return false;
    // }
    return row === currentRow && cell === currentCell;
  };

  // handling/setting letters on key press
  const onKeyPressed = (key) => {
    const updatedRows = cloneArray(rows);

    if (currentRow > rows.length - 1) {
      return;
    }

    if (key === CLEAR) {
      const previousCell = currentCell - 1;
      if (previousCell >= 0) {
        updatedRows[currentRow][previousCell] = "";
        setRows(updatedRows);
        setCurrentCell(previousCell);
      }
      return;
    }

    if (key === ENTER) {
      if (currentCell === rows[0].length) {
        setCurrentRow(currentRow + 1);
        setCurrentCell(0);
      }
      return;
    }

    if (currentCell < rows[0].length) {
      updatedRows[currentRow][currentCell] = key;
      setRows(updatedRows);
      setCurrentCell(currentCell + 1);
    }
  };

  // handling cell colors on moving to next row
  const getCellBGColor = (row, cell) => {
    const letter = rows[row][cell];
    if (row >= currentRow) {
      return COLORS.black;
    }
    if (letter === letters[cell]) {
      return COLORS.primary;
    }
    if (letters.includes(letter)) {
      return COLORS.secondary;
    }
    return COLORS.darkgrey;
  };

  // handling keyboard colors
  const getLettersWithColors = (color) => {
    return rows.flatMap((row, rowIndex) =>
      row.filter(
        (letter, cellIndex) => getCellBGColor(rowIndex, cellIndex) === color
      )
    );
  };
  const greenCaps = getLettersWithColors(COLORS.primary);
  const yellowCaps = getLettersWithColors(COLORS.secondary);
  const greyCaps = getLettersWithColors(COLORS.darkgrey);

  // Handling game state
  useEffect(() => {
    if (currentRow > 0) {
      getGameState();
    }
    // console.warn(greenCaps);
  }, [currentRow]);

  // game status checking
  const getGameState = () => {
    if (checkIfWon()) {
      setGameState("won");
      Alert.alert("Hey!", "You won!");
    } else if (checkIfLost()) {
      setGameState("lost");
      Alert.alert("Hey!", "You lost!");
    }
  };

  // Checking if game is won
  const checkIfWon = () => {
    return letters.join("") === rows[currentRow - 1].join("");
  };

  // Checking if game is lost
  const checkIfLost = () => {
    return currentRow >= rows.length;
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
                    borderColor:
                      gameState === "playing" &&
                      isCellActive(rowIndex, cellIndex)
                        ? COLORS.lightgrey
                        : COLORS.darkgrey,
                    backgroundColor: getCellBGColor(rowIndex, cellIndex),
                  },
                ]}
              >
                <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Keyboard
        onKeyPressed={(key) => onKeyPressed(key)}
        greenCaps={greenCaps}
        yellowCaps={yellowCaps}
        greyCaps={greyCaps}
      />
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
