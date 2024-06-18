import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants";
import CoinCapsule from "../components/Capsule/CoinCapsule";
import SettingMenu from "../components/Popups/SettingPopup";

const Home = () => {
  const image = require("../../assets/homebg.jpg");

  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [vibrationOn, setVibrationOn] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Coins Logic
  const [coins, setCoins] = useState(100);

  const handleAddCoins = () => {
    setCoins(coins + 10);
  };

  const handleCloseSettingMenu = () => {
    setIsSettingsVisible(false);
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
        <View style={styles.mainContainer}>
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
              onPress={() => navigation.navigate("GameScreen", { level: 1 })}
            >
              <Text style={styles.buttonText}>Continue Level 1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("NewGame")}
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
                  /* Add share logic */
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
                onPress={() => navigation.navigate("HowToPlay")}
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

      {/* {{//TODO: Add play levelwise //TODO: Add play Daily challenges.}} */}
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
