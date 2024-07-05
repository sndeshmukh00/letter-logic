import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
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
import usePersistGame, {
  usePersistedData,
  setDailyChallengeCompleted,
  setLevelCompleted,
  getLevelCompleted,
} from "../hooks/usePersistGame";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityLoader from "../components/Loader/ActivityLoader";
import { getDailyWord } from "../api/getDailyWord";
import { getLevelWord } from "../api/getLevelWord";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  updateCoins,
  updateHints,
  updateLevel,
} from "../store/actions/setUserData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HowToPlayPopup from "../components/Popups/HowToPlayPopup";
import GeneralPopup from "../components/Popups/GeneralPopup";
import HintsPopup from "../components/Popups/HintsPopup";
// import { getRewardedAd } from "../../ads";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const androidAdmobInterstitial = "ca-app-pub-12345678910/12345678910";
const productionID = androidAdmobInterstitial;
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : productionID;
// Make sure to always use a test ID when not in production

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ["food", "cooking", "fruit"], // Update based on the most relevant keywords for your app/users, these are just random examples
  requestNonPersonalizedAdsOnly: true, // Update based on the initial tracking settings from initialization earlier
});

export default function MainGame({ navigation, route }) {
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const localStateLevel = useSelector((state) => state.user.level); // Accessing the level from Redux store
  const coins = useSelector((state) => state.user.coins); // Accessing the coins from Redux store
  const hints = useSelector((state) => state.user.hints); // Accessing the hints from Redux store

  const { date, level } = route.params;
  const [levelToDisplay, setLevelToDisplay] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [gameLoaded, setGameLoaded] = useState(false);
  const image = require("../../assets/homebg.jpg");

  // const word = "hello";
  const [word, setWord] = useState("Hello");
  const [letters, setLetters] = useState([]);

  const [complexity, setComplexity] = useState(0.9); // 1 - easy, 2 - medium, 3 - hard
  // For keeping track of current cell
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCell, setCurrentCell] = useState(0);
  const [lives, setLives] = useState(1);
  // const [level, setLevel] = useState(1);
  const [isChampionship, setIsChampionship] = useState(false);

  // For handling Game Status
  const [gameState, setGameState] = useState("playing"); //won, lost, playing
  const [popupVisible, setPopupVisible] = useState(false);
  const [restarted, setRestarted] = useState(false);

  const [howToPlayVisible, setHowToPlayVisible] = useState(false);
  const [showNoMoreHints, setShowNoMoreHints] = useState(false);
  const [showHintsPopup, setShowHintsPopup] = useState(false);

  // For ads
  const [adLoaded, setAdLoaded] = useState(false);

  const handleHome = () => {
    setPopupVisible(false);
    navigation.navigate("Home");
    // Navigate to Home
  };

  const handleNext = async () => {
    setPopupVisible(false);
    if (date) {
      navigation.navigate("DailyChallenges", { date: date });
    } else if (level) {
      setIsLoading(true);
      const localLevel = localStateLevel;
      getWord(localLevel); // Fetch the word for the new level
    }
  };

  // Defining Rows and cells with empty values
  // const rows = new Array(complexity).fill(null);

  const [rows, setRows] = useState([]);

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
  }, [currentRow]);

  // game status checking
  const getGameState = async () => {
    if (checkIfWon() && gameState !== "won") {
      setGameState("won");
      if (level && !restarted) {
        setHintedKey([]);
        dispatch(updateLevel(1));
        dispatch(updateCoins(40));

        // await setLevelCompleted(localLevel + 1);
      }

      // if (date) setDailyChallengeCompleted(date);
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

  // Handling Restart
  const handleRestart = () => {
    // Restart logic
    setPopupVisible(false);
    setCurrentRow(0);
    setCurrentCell(0);
    setRows(
      new Array(Math.ceil(letters.length / complexity)).fill(
        new Array(letters.length).fill("")
      )
    );
    setRestarted(true);
    setGameState("playing");
  };

  // Handling Save to internet
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

  // Coins Logic
  const handleAddCoins = () => {
    // setCoins(coins + 10);
    dispatch(updateCoins(+100));

    // TODO: Add coins logic here via ads and purchase
  };

  // Handling Hints Logic Here:
  const [hintedKey, setHintedKey] = useState([]);

  const handlePurchase = () => {
    // Navigate to the purchase page
    // navigation.navigate("Purchase");
  };

  const handleHint = () => {
    setShowHintsPopup(true);
  };
  const showHintOnKeyboard = async (key) => {
    const remainingLetters = letters.filter(
      (letter) =>
        !greenCaps.includes(letter) &&
        !yellowCaps.includes(letter) &&
        !hintedKey.includes(letter)
    );
    if (remainingLetters.length === 0) {
      setShowNoMoreHints(true);
      return "NONEED";
    } else if (remainingLetters.length > 0) {
      const randomLetter =
        remainingLetters[Math.floor(Math.random() * remainingLetters.length)];

      console.log([...hintedKey, randomLetter]);
      setHintedKey([...hintedKey, randomLetter]);
    }
  };
  const handleUseHint = async () => {
    const resp = await showHintOnKeyboard();
    if (resp !== "NONEED") {
      dispatch(updateHints(-1));
    }
  };
  const handleUseHintByCoin = async () => {
    const resp = await showHintOnKeyboard();
    if (resp !== "NONEED") {
      dispatch(updateCoins(-100));
    }
  };

  // Handling how to play button Logic Here:
  const handleHowToPlay = () => {
    setHowToPlayVisible(true);
  };
  const handleCloseHowToPlay = () => {
    setHowToPlayVisible(false);
  };

  // Persisting game state to LocalStorage
  const persistGameState = () => {
    usePersistGame(rows, currentRow, currentCell, gameState);
  };

  useEffect(() => {
    // Saving game state to LocalStorage
    // if (gameLoaded) persistGameState();
  }, [rows, currentRow, currentCell, gameState]);

  const getWord = async (localLevel) => {
    if (date) {
      const dailyWord = await getDailyWord(date);
      console.log(dailyWord);
      setWord(dailyWord.words);
      setLetters(dailyWord.words.split(""));
    } else if (localLevel) {
      const levelWord = await getLevelWord(localLevel);
      if (!levelWord) {
        // Implement error handling
        // return;
      }
      setLevelToDisplay(localLevel);
      console.log(levelWord);
      setWord(levelWord.words);
      setLetters(levelWord.words.split(""));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const initializeGame = async () => {
      if (level) {
        getWord(level);
      } else {
        const localStateLevel = useSelector((state) => state.user.level); // Accessing the level from Redux store
        getWord(localStateLevel);
      }
    };
    initializeGame();
  }, []);

  // Initializing rows after letters have been set
  useEffect(() => {
    if (letters.length > 0) {
      setRows(
        new Array(Math.ceil(letters.length / complexity)).fill(
          new Array(letters.length).fill("")
        )
      );
      setCurrentRow(0);
      setCurrentCell(0);
      setGameState("playing");
    }
  }, [letters]);

  // Handling Interstitial Ads

  useEffect(() => {
    // Event listener for when the ad is loaded
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setAdLoaded(true);
      }
    );
    // Event listener for when the ad is closed
    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setAdLoaded(false);
        // Load a new ad when the current ad is closed
        interstitial.load();
      }
    );
    // Start loading the interstitial ad straight away
    interstitial.load();
    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  // Maybe use this later for persisting half played game state
  // const readState = async () => {
  //   const data = await usePersistedData();
  //   if (data) {
  //     setGameState(data.gameState);
  //     setRows(data.rows);
  //     setCurrentCell(data.currentCell);
  //     setCurrentRow(data.currentRow);
  //   }
  //   setGameLoaded(true);
  // };

  return (
    <SafeAreaView style={[safeViewAndroid.AndroidSafeArea, styles.container]}>
      {isLoading ? (
        <ActivityLoader />
      ) : (
        <>
          <GeneralPopup
            visible={showNoMoreHints}
            onCancel={() => setShowNoMoreHints(false)}
            title="No more alphabets left!!"
            message="All alphabets have been guessed!"
          />
          <HintsPopup
            visible={showHintsPopup}
            onClose={() => setShowHintsPopup(false)}
            onPurchase={handlePurchase}
            useHints={handleUseHint}
            useHintsByCoin={handleUseHintByCoin}
          />
          <GamePopup
            visible={popupVisible}
            onHome={() => {
              if (adLoaded) {
                interstitial.show();
              }
              handleHome();
            }}
            onRestart={() => {
              if (adLoaded) {
                interstitial.show();
              }
              handleRestart();
            }}
            onNext={() => {
              if (adLoaded) {
                interstitial.show();
              }
              handleNext();
            }}
            win={gameState === "won"}
            getScore={getScoreMessage}
          />
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
            onRestart={() => {
              if (adLoaded) {
                interstitial.show();
              }
              handleRestart();
            }}
            onHome={() => {
              if (adLoaded) {
                interstitial.show();
              }
              handleHome();
            }}
            onQuit={handleQuit}
            onToggleMusic={handleToggleMusic}
            onToggleSound={handleToggleSound}
            onToggleVibration={handleToggleVibration}
            musicOn={musicOn}
            soundOn={soundOn}
            vibrationOn={vibrationOn}
            handleHowToPlay={handleHowToPlay}
          />
          <HowToPlayPopup
            visible={howToPlayVisible}
            onClose={handleCloseHowToPlay}
          />
          <View style={styles.scoreContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
            />
            <Text style={styles.level}>Level: {levelToDisplay}</Text>
          </View>
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
            handleHint={handleHint}
            greenCaps={greenCaps}
            yellowCaps={yellowCaps}
            greyCaps={greyCaps}
            hintedKey={hintedKey}
            enterEnabled={currentCell === letters.length}
          />
        </>
      )}
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
    marginVertical: 0,
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
    borderRadius: 10,
    borderBottomWidth: 3,
    shadowColor: COLORS.lightgrey,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
  },
  cellText: {
    color: COLORS.lightgrey,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    top: "0%",
    width: 150,
    height: 40,
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
  lives: {
    color: COLORS.lightgrey,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 5,
  },
  level: {
    paddingTop: 6,
    color: COLORS.lightgrey,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  topMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
});
