import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DailyChallenges from "../Screens/DailyChallenges";
import MainGame from "../Screens/MainGame";
import Home from "../Screens/Home";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="DailyChallenges"
          component={DailyChallenges}
          options={{ title: "Daily Challenges" }}
        />
        <Stack.Screen
          name="GameScreen"
          component={MainGame}
          options={{ title: "Game" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
