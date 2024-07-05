import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS } from "../../constants";

const ComingSoonPopup = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LottieView
            source={require("../../../assets/comingsoon.json")}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.title}>Coming Soon!</Text>
          <Text style={styles.message}>This feature is under development.</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
  },
  animation: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ComingSoonPopup;
