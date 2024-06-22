import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { AuthContext } from "../Navigation/AuthContext";
import { COLORS } from "../constants";

const Signup = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Perform signup logic here
    // const userData = { name }; // Replace with real user data
    // login(userData);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Create a new account</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor={COLORS.lightgrey}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={COLORS.lightgrey}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={COLORS.lightgrey}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Signup</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button2}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Already have an account?</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.buttonLink}
            onPress={() => navigation.navigate("AppStack")}
          >
            <Text style={styles.linkText}>Continue without login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.black,
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    marginBottom: 20,
    color: COLORS.lightgrey,
  },
  input: {
    backgroundColor: COLORS.black,
    color: COLORS.lightgrey,
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 10,
  },
  logo: {
    alignSelf: "center",
    // top: "-10%",
    width: 300,
    height: 150,
    // marginBottom: 20,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 2,
  },
  button: {
    backgroundColor: COLORS.grey,
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  button2: {
    // borderColor: COLORS.grey,
    borderWidth: 1,
    backgroundColor: COLORS.darkgrey,
    width: "100%",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.lightgrey,
    fontSize: 20,
    textAlign: "center",
  },
  buttonLink: {
    padding: 15,
    marginVertical: 10,
  },
  linkText: {
    textDecorationLine: "underline",
    color: COLORS.lightgrey,
    fontSize: 16,
    textAlign: "center",
  },
});

export default Signup;
