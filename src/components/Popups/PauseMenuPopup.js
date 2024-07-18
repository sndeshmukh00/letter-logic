import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal, BackHandler } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setMusicStatus,
  setSoundStatus,
  setVibrationStatus,
} from "../../store/actions/setUserData";
import ConfirmationPopup from "./ConfirmationPopup";

const PauseMenu = ({
  visible,
  onClose,
  onHome,
  onRestart,
  // onQuit,
  onToggleMusic,
  onToggleSound,
  onToggleVibration,
  musicOn,
  soundOn,
  vibrationOn,
  handleHowToPlay,
}) => {
  const dispatch = useDispatch();
  const muteMusic = useSelector((state) => state.muteMusic);
  const muteSounds = useSelector((state) => state.muteSounds);
  const muteVibrations = useSelector((state) => state.muteVibrations);

  const [isQuitConfirmationVisible, setIsQuitConfirmationVisible] = useState(false);

  const onQuit = () => {
    BackHandler.exitApp();
  };

  const quitHandler = () => {
    setIsQuitConfirmationVisible(true);
  };
  const handleConfirmQuit = () => {
    setIsQuitConfirmationVisible(false);
    onClose();
    onQuit();
  };

  const handleCancelQuit = () => {
    setIsQuitConfirmationVisible(false);
  };

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
            <TouchableOpacity style={styles.button} onPress={onHome}>
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onRestart}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={quitHandler}>
                  <Text style={styles.buttonText}>Quit</Text>
                </TouchableOpacity>
                {isQuitConfirmationVisible && (
                  <ConfirmationPopup
                    title="Confirm Quitting"
                    message={`Are you sure you want to quit?`}
                    visible={isQuitConfirmationVisible}
                    onConfirm={handleConfirmQuit}
                    onCancel={handleCancelQuit}
                  />
                )}
          </View>
          <View style={styles.iconsContainer}>
            {/* <TouchableOpacity
              onPress={() => {
                dispatch(setMusicStatus(!muteMusic));
              }}
            >
              <MaterialIcons
                name={!muteMusic ? "music-note" : "music-off"}
                size={32}
                color="white"
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                dispatch(setSoundStatus(!muteSounds));
              }}
            >
              <MaterialIcons
                name={!muteSounds ? "volume-up" : "volume-off"}
                size={32}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(setVibrationStatus(!muteVibrations));
              }}
            >
              <MaterialCommunityIcons
                name={!muteVibrations ? "vibrate" : "vibrate-off"}
                size={32}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleHowToPlay}>
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
