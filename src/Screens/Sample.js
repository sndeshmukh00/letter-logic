import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Sample = () => {
  return (
    <View
      style={{
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Text style={{ color: "red", backgroundColor: "yellow" }}>Sample</Text>
    </View>
  );
};

export default Sample;

const styles = StyleSheet.create({});
