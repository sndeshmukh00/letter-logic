import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from "react-native";
import { COLORS } from "../../constants";

const GeneralPopup = ({ visible, showCancel = true, onCancel, title, message , showStopLoading, onStopLoading}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={[styles.buttonContainer, {justifyContent: showStopLoading !== false ? "center" : "space-between"}]}>
            {showCancel !== false && (
              <TouchableOpacity style={styles.confirmButton} onPress={() => onCancel()}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            )}
            {showStopLoading && <Button size="large" style={[{alignSelf: "center"}, styles.confirmButton]} color={'#ff6666'}  onPress={onStopLoading} title="Stop Loading" />}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    flex: 1,
    padding: 15,
    margin: 5,
    backgroundColor: "#ff6666",
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    margin: 5,
    backgroundColor: "#cccccc",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default GeneralPopup;
