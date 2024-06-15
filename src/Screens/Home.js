import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const image = require("../../assets/homebg.jpg");
  return (
    <>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
        </View>
      </ImageBackground>
      <StatusBar style="light" />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  logoContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0000005b",
  },
  logo: {
    flex: 1,
    top: "-30%",
    width: "90%",
    alignSelf: "center",
    resizeMode: "contain",
  },
});
