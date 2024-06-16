import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { CLEAR, COLORS, ENTER, colorsToEmoji } from "../../src/constants";
import Keyboard from "../../src/components/Keyboard";
import { useEffect, useState } from "react";
import GamePopup from "../../src/components/Popups/GameStatePopup";
import safeViewAndroid from "../safeViewAndroid";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import PauseMenu from "../components/Popups/PauseMenuPopup";
import CoinCapsule from "../components/Capsule/CoinCapsule";

export default function MainGame() {
  const image = require("../../assets/homebg.jpg");

  const word = "hello";
  const letters = word.split("");
  const complexity = 0.9; // 1 - easy, 2 - medium, 3 - hard
  // For keeping track of current cell
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCell, setCurrentCell] = useState(0);
  const [globalRank, setGlobalRank] = useState(1);
  const [lives, setLives] = useState(1);
  const [level, setLevel] = useState(1);
  const [isChampionship, setIsChampionship] = useState(false);

  // For handling Game Status
  const [gameState, setGameState] = useState("playing"); //won, lost, playing
  const [popupVisible, setPopupVisible] = useState(false);

  const handleHome = () => {
    setPopupVisible(false);
    // Navigate to Home
  };

  // const handleRestart = () => {
  //   setPopupVisible(false);
  //   // Restart the game
  // };

  const handleNext = () => {
    setPopupVisible(false);
    // Go to next level
  };

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
    if (gameState !== "playing") {
      return;
    }
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
    if (checkIfWon() && gameState !== "won") {
      setGameState("won");
      // Alert.alert("Hey!", "You won!");
      setPopupVisible(true);
    } else if (checkIfLost() && gameState !== "lost") {
      setGameState("lost");
      // Alert.alert("Hey!", "You lost!");
      setPopupVisible(true);
    }
  };

  // Checking if game is won
  const checkIfWon = () => {
    return letters.join("") === rows[currentRow - 1].join("");
  };

  // Checking if game is lost
  const checkIfLost = () => {
    return !checkIfWon() && currentRow >= rows.length;
  };

  // getting score message
  const getScoreMessage = async () => {
    const score = rows
      .map((row, rowIndex) =>
        row
          .map(
            (letter, cellIndex) =>
              colorsToEmoji[getCellBGColor(rowIndex, cellIndex)]
          )
          .join("")
      )
      .filter((row) => row !== "")
      .join("\n");
    return `Letter Logic - 1 \n` + score;
  };

  // pause menu functions

  const [musicOn, setMusicOn] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [vibrationOn, setVibrationOn] = useState(true);
  const handlePause = () => {
    setGameState("paused");
  };

  const handleClosePauseMenu = () => {
    setGameState("playing");
  };

  const handleRestart = () => {
    // Restart logic
    setGameState("playing");
  };

  const handleSave = () => {
    // Save logic
    // TODO: Implement save logic using custom hooks
    // setGameState("saved");
  };

  const handleQuit = () => {
    // Quit logic
    setGameState("closed");
  };

  const handleToggleMusic = () => {
    // TODO: Implement music on/off toggle logic using custom hooks
    setMusicOn(!musicOn);
  };

  const handleToggleSound = () => {
    // TODO: Implement sound on/off toggle logic using custom hooks
    setSoundOn(!soundOn);
  };

  const handleToggleVibration = () => {
    // TODO: Implement vibration on/off toggle logic using custom hooks
    setVibrationOn(!vibrationOn);
  };

  const [coins, setCoins] = useState(100);

  const handleAddCoins = () => {
    setCoins(coins + 10);
  };

  return (
    <SafeAreaView style={[safeViewAndroid.AndroidSafeArea, styles.container]}>
      <GamePopup
        visible={popupVisible}
        onHome={handleHome}
        onRestart={handleRestart}
        onNext={handleNext}
        win={gameState === "won"}
        getScore={getScoreMessage}
      />
      {/* Pause button */}
      <View style={styles.topMenu}>
        <TouchableOpacity
          onPress={() => {
            gameState === "paused"
              ? setGameState("playing")
              : setGameState("paused");
          }}
        >
          <MaterialIcons
            name={gameState === "paused" ? "play-arrow" : "pause"}
            size={32}
            color="white"
          />
        </TouchableOpacity>
        <CoinCapsule coins={coins} onAddCoins={handleAddCoins} />
      </View>
      <PauseMenu
        visible={gameState === "paused"}
        onClose={handleClosePauseMenu}
        onRestart={handleRestart}
        onSave={handleSave}
        onQuit={handleQuit}
        onToggleMusic={handleToggleMusic}
        onToggleSound={handleToggleSound}
        onToggleVibration={handleToggleVibration}
        musicOn={musicOn}
        soundOn={soundOn}
        vibrationOn={vibrationOn}
      />
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      {isChampionship ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.rank}>🌎: {globalRank}</Text>
          <Text style={styles.lives}>❤️: {lives}</Text>
        </View>
      ) : (
        <View style={styles.scoreContainer}>
          <Text style={styles.level}>Level: {level}</Text>
        </View>
      )}

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
        enterEnabled={currentCell === rows[0].length}
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
  logo: {
    // backgroundColor: "red",
    // flex: 1,
    top: "0%",
    width: 200,
    height: 50,
    alignSelf: "center",
    resizeMode: "contain",
  },

  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  rank: {
    color: COLORS.lightgrey,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 5,
  },
  lives: {
    color: COLORS.lightgrey,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 5,
  },
  level: {
    color: COLORS.lightgrey,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 5,
  },
  topMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
});
