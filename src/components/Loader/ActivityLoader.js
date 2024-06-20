import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { PacmanIndicator } from "react-native-indicators";
import { COLORS } from "../../constants";

const ActivityLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <PacmanIndicator color={COLORS.lightgrey} size={50} />
        <Text style={styles.word}>Game is loading...</Text>
        <Text style={styles.subtitle}>
          This may depend on your internet speed.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    // position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.black,
  },
  innerContainer: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    color: COLORS.lightgrey,
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: COLORS.lightgrey,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ActivityLoader;
