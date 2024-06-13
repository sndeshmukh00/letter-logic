import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "./src/constants";
import SafeViewAndroid from "./src/safeViewAndroid";
import Keyboard from "./src/components/Keyboard";

export default function App() {
  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, styles.container]}>
      <StatusBar style="light" />

      <Text style={styles.title}>Letter Logic</Text>

      <Keyboard />
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
});
