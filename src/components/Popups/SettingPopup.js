import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  BackHandler,
  TouchableWithoutFeedback,
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ConfirmationPopup from "./ConfirmationPopup";
import HowToPlayPopup from "./HowToPlayPopup";
import {
  setSoundStatus,
  setMusicStatus,
  setVibrationStatus,
} from "../../store/actions/setUserData";
import { useDispatch, useSelector } from "react-redux";

const SettingMenu = ({ visible, onClose, onLogin, onLogout, isLoggedIn }) => {
  const dispatch = useDispatch();
  const muteMusic = useSelector((state) => state.muteMusic);
  const muteSounds = useSelector((state) => state.muteSounds);
  const muteVibrations = useSelector((state) => state.muteVibrations);
  const [isDeleteConfirmationVisible, setisDeleteConfirmationVisible] =
    useState(false);
  const [isQuitConfirmationVisible, setIsQuitConfirmationVisible] =
    useState(false);
  const [howToPlayVisible, setHowToPlayVisible] = useState(false);

  const onQuit = () => {
    BackHandler.exitApp();
  };
  const handleLogout = () => {
    setIsQuitConfirmationVisible(false);
    onClose();
  };

  const handleDeleteMyData = () => {
    setisDeleteConfirmationVisible(true);
  };
  const handleConfirmDelete = () => {
    setisDeleteConfirmationVisible(false);
    // TODO: Implement delete account functionality
  };

  const handleCancelDelete = () => {
    setisDeleteConfirmationVisible(false);
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

  // Handling How to Play popup here
  const handleHowToPlay = () => {
    setHowToPlayVisible(true);
  };

  const handleCloseHowToPlay = () => {
    setHowToPlayVisible(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.popup}>
              <View style={styles.banner}>
                <Text style={styles.bannerText}>Settings</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={isLoggedIn ? onLogout : onLogin}
                >
                  <Text style={styles.buttonText}>
                    {isLoggedIn ? "Logout" : "Login"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleDeleteMyData}
                >
                  <Text style={styles.buttonText}>Delete my data</Text>
                </TouchableOpacity>
                {isDeleteConfirmationVisible && (
                  <ConfirmationPopup
                    title="Confirm Deletion"
                    message={`Are you sure you want to delete your data?
                \nThis action will remove all your game progress & statistics.
                \nYou can't undo it.`}
                    visible={isDeleteConfirmationVisible}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                  />
                )}
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
                  <Ionicons
                    name="help-circle-outline"
                    size={32}
                    color="white"
                  />
                </TouchableOpacity>
                {howToPlayVisible && (
                  <HowToPlayPopup
                    visible={howToPlayVisible}
                    onClose={handleCloseHowToPlay}
                  />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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

export default SettingMenu;
