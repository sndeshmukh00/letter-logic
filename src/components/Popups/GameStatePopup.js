import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Share,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import LottieView from "lottie-react-native";

const GamePopup = ({ visible, onHome, onRestart, onNext, win, getScore }) => {
  const message = win ? "You Win!" : "You Lose!";
  const animation = win ? "bounceIn" : "shake";
  const lottieSource = win
    ? require("../../../assets/celebration.json")
    : require("../../../assets/sadness.json");

  const onShare = async () => {
    try {
      const message = await getScore();
      const result = await Share.share({
        message: message,
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

  return (
    <Modal transparent={true} visible={visible} animationType="none">
      <View style={styles.overlay}>
        <Animatable.View animation={animation} style={styles.popup}>
          <LinearGradient
            colors={
              win
                ? ["#2b8a3b", "#0e5910", "#1d270c"]
                : ["#df1b1b", "#892121", "#400f0f"]
            }
            style={styles.gradient}
          >
            <LottieView
              source={lottieSource}
              autoPlay
              loop
              style={styles.lottie}
            />
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onHome}>
                <Icon name="home" size={24} color="#fff" />
                <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={onRestart}>
                <Icon name="refresh" size={24} color="#fff" />
                <Text style={styles.buttonText}>Restart</Text>
              </TouchableOpacity>
              {win && (
                <TouchableOpacity style={styles.button} onPress={onNext}>
                  <Icon name="arrow-right" size={24} color="#fff" />
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.button} onPress={onShare}>
                <Icon name="share-alt" size={24} color="#fff" />
                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animatable.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  popup: {
    width: 350,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  gradient: {
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
  },
  lottie: {
    width: 350,
    height: 150,
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    marginTop: 5,
  },
});

export default GamePopup;
