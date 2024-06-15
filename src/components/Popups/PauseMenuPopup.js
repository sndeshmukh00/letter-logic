import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const PauseMenu = ({
  visible,
  onClose,
  onRestart,
  onQuit,
  onToggleMusic,
  onToggleSound,
  onToggleVibration,
  musicOn,
  soundOn,
  vibrationOn,
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Paused</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onRestart}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onQuit}>
              <Text style={styles.buttonText}>Quit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={onToggleMusic}>
              <MaterialIcons
                name={musicOn ? "music-note" : "music-off"}
                size={32}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onToggleSound}>
              <MaterialIcons
                name={soundOn ? "volume-up" : "volume-off"}
                size={32}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onToggleVibration}>
              <MaterialCommunityIcons
                name={vibrationOn ? "vibrate" : "vibrate-off"}
                size={32}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="help-circle-outline" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    width: "80%",
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  banner: {
    position: "absolute",
    top: -25,
    backgroundColor: "#ff6347",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonsContainer: {
    marginTop: 40,
    width: "100%",
  },
  button: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
});

export default PauseMenu;
