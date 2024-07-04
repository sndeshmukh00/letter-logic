import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import { FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants";
import CoinCapsule from "../components/Capsule/CoinCapsule";
import SettingMenu from "../components/Popups/SettingPopup";
import HowToPlayPopup from "../components/Popups/HowToPlayPopup";
import ConfirmationPopup from "../components/Popups/ConfirmationPopup";
import { AuthContext } from "../Navigation/AuthContext";
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
  const { isLoggedIn, useLogout } = useContext(AuthContext);
  const level = useSelector((state) => state.user.level); // Accessing the level from Redux store
  const image = require("../../assets/homebg.jpg");

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [vibrationOn, setVibrationOn] = useState(true);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [howToPlayVisible, setHowToPlayVisible] = useState(false);
  const [coins, setCoins] = useState(100);

  const handleAddCoins = () => {
    console.log("coins clicked");
    setCoins(coins + 10);
  };

  const handleCloseSettingMenu = () => {
    setIsSettingsVisible(false);
  };

  const handleToggleMusic = () => {
    setMusicOn(!musicOn);
  };

  const handleToggleSound = () => {
    setSoundOn(!soundOn);
  };

  const handleToggleVibration = () => {
    setVibrationOn(!vibrationOn);
  };

  const handleLogout = () => {
    setLogoutVisible(true);
  };

  const handleConfirmLogout = () => {
    setLogoutVisible(false);
    useLogout();
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Hey! I just found this awesome game! 🎮 It has daily challenges, amazing levels, and tons of fun! Download it now and join me in the adventure! 📲",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleHowToPlay = () => {
    setHowToPlayVisible(true);
  };

  const handleCloseHowToPlay = () => {
    setHowToPlayVisible(false);
  };

  return (
    <>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SettingMenu
          visible={isSettingsVisible}
          onClose={handleCloseSettingMenu}
          onToggleMusic={handleToggleMusic}
          onToggleSound={handleToggleSound}
          onToggleVibration={handleToggleVibration}
          musicOn={musicOn}
          soundOn={soundOn}
          vibrationOn={vibrationOn}
        />
        <HowToPlayPopup
          visible={howToPlayVisible}
          onClose={handleCloseHowToPlay}
        />
        <ConfirmationPopup
          visible={logoutVisible}
          onCancel={() => setLogoutVisible(false)}
          onConfirm={() => handleConfirmLogout()}
          title="Are you sure you want to log out?"
          message="You may lose all your progress."
        />
        <View style={styles.mainContainer}>
          {!isLoggedIn ? (
            <View style={styles.loginMenu}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AuthStack")}
              >
                <AntDesign name="login" size={30} color={COLORS.lightgrey} />
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.loginMenu}>
              <TouchableOpacity onPress={() => handleLogout()}>
                <AntDesign name="logout" size={30} color={COLORS.lightgrey} />
                <Text style={styles.loginText}>Logout</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.coinMenu}>
            <CoinCapsule coins={coins} onAddCoins={handleAddCoins} />
          </View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
            />
          </View>
          <View style={styles.container2}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("DailyChallenges")}
            >
              <Text style={styles.buttonText}>Daily Challenge</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("GameScreen", { level: level })
              }
            >
              <Text style={styles.buttonText}>Continue Level {level}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={
                () => {}
                // handle logic with poping up confirmation then clearing level in storage
              }
            >
              <Text style={styles.buttonText}>New Game</Text>
            </TouchableOpacity>

            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setIsSettingsVisible(true)}
              >
                <FontAwesome name="cog" size={30} color={COLORS.lightgrey} />
                <Text style={styles.iconText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  handleShare();
                }}
              >
                <FontAwesome
                  name="share-alt"
                  size={30}
                  color={COLORS.lightgrey}
                />
                <Text style={styles.iconText}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.icon}
                onPress={() => navigation.navigate("Ranking")}
              >
                <FontAwesome name="trophy" size={30} color={COLORS.lightgrey} />
                <Text style={styles.iconText}>Ranking</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.icon}
                onPress={() => handleHowToPlay()}
              >
                <Ionicons
                  name="help-circle"
                  size={30}
                  color={COLORS.lightgrey}
                />
                <Text style={styles.iconText}>How to Play</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="light" />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#0000005b",
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  logoContainer: {
    top: "10%",
    flex: 1,
    width: "100%",
  },
  logo: {
    flex: 1,
    top: "-30%",
    width: "90%",
    alignSelf: "center",
    resizeMode: "contain",
  },
  coinMenu: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  loginMenu: {
    color: COLORS.lightgrey,
    fontSize: 20,
    zIndex: 10,
    top: 20,
    left: 20,
  },
  loginText: {
    color: COLORS.lightgrey,
    fontSize: 20,
    position: "absolute",
    left: 36,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    width: "80%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: COLORS.lightgrey,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
    position: "absolute",
    bottom: 20,
    padding: 8,
    backgroundColor: "#0000009b",
  },
  icon: {
    // width: "auto",
    // height: "auto",
    // aspectRatio: 1,
    borderRadius: 5,
    color: COLORS.lightgrey,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    color: COLORS.lightgrey,
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
});
