import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { COLORS } from "../../constants";
import { Entypo } from "@expo/vector-icons";

const HowToPlayPopup = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.header}>How to Play</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Entypo
              name="cross"
              size={32}
              color={COLORS.lightgrey}
              style={styles.closeButtonIcon}
            />
            {/* <Text style={styles.closeButtonIcon}>X</Text> */}
          </TouchableOpacity>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.instructions}>
              You have to guess the <Text style={styles.highlight}>WORD </Text>
              in 6 tries or less.
            </Text>
            <Text style={styles.instructions}>
              Only a valid 5-letter word could be entered as a guess. Hit
              "Submit" button to check your guess and move to next row.
            </Text>
            <Text style={styles.instructions}>
              The color of tiles will be changed to show how close you are to
              the <Text style={styles.highlight}>WORD</Text>.
            </Text>
            <Text style={styles.examplesHeader}>Examples:</Text>
            <View style={styles.example}>
              <View style={styles.tileCorrect}>
                <Text style={styles.tileText}>H</Text>
              </View>
              <View style={styles.tile}>
                <Text style={styles.tileText}>O</Text>
              </View>
              <View style={styles.tile}>
                <Text style={styles.tileText}>O</Text>
              </View>
              <View style={styles.tile}>
                <Text style={styles.tileText}>K</Text>
              </View>
              <View style={styles.tile}>
                <Text style={styles.tileText}>S</Text>
              </View>
            </View>
            <Text style={styles.instructions}>
              "<Text style={styles.highlight}>H</Text>" is in the word and in
              the correct place.
            </Text>
            <View style={styles.example}>
              <View style={styles.tile}>
                <Text style={styles.tileText}>B</Text>
              </View>
              <View style={styles.tilePresent}>
                <Text style={styles.tileText}>L</Text>
              </View>
              <View style={styles.tile}>
                <Text style={styles.tileText}>I</Text>
              </View>
              <View style={styles.tile}>
                <Text style={styles.tileText}>N</Text>
              </View>
              <View style={styles.tile}>
                <Text style={styles.tileText}>D</Text>
              </View>
            </View>
            <Text style={styles.instructions}>
              "<Text style={styles.highlight}>L</Text>" is in the word but in
              the wrong place.
            </Text>
            <View style={styles.example}>
              <View style={styles.tile}>
                <Text style={styles.tileText}>P</Text>
              </View>
              <View style={styles.tile}>
                <Text style={styles.tileText}>L</Text>
              </View>
              <View style={styles.tileAbsent}>
                <Text style={styles.tileText}>U</Text>
              </View>
              <View style={styles.tile}>
                <Text style={styles.tileText}>G</Text>
              </View>
              <View style={styles.tile}>
                <Text style={styles.tileText}>S</Text>
              </View>
            </View>
            <Text style={styles.instructions}>
              "<Text style={styles.highlight}>U</Text>" is not in the word in
              any place.
            </Text>
          </ScrollView>
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
    width: "90%",
    // padding: 20,
    backgroundColor: COLORS.darkgrey,
    borderRadius: 10,
    position: "relative",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: COLORS.lightgrey,
    marginVertical: 10,
  },
  highlight: {
    color: "red",
    fontWeight: "bold",
  },
  examplesHeader: {
    color: COLORS.lightgrey,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  example: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  tile: {
    width: 40,
    height: 40,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  tileText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tileCorrect: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  tilePresent: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  tileAbsent: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.grey,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  closeButton: {
    position: "absolute",
    // top: 10,
    right: 10,
    backgroundColor: "transparent",
  },
  closeButtonIcon: {
    color: "#fff",
    padding: 10,
  },
});

export default HowToPlayPopup;
