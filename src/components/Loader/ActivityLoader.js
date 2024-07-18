import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import { PacmanIndicator } from "react-native-indicators";
import { COLORS } from "../../constants";

const ActivityLoader = ({ isLoading, title, subtitle = true, showStopLoading = false, onStopLoading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <PacmanIndicator color={COLORS.lightgrey} size={50} />
        <Text style={styles.word}>{title ? title : "Game is loading..."}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>
            {subtitle === true
              ? "This depend on your internet speed."
              : subtitle}
          </Text>
        )}

        {showStopLoading && <>
        <View style={{marginTop: 20}}>

          <Button size="large" color={'#ff6666'} onPress={onStopLoading} title="Stop Loading" />
        </View>
          </>
        }
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
