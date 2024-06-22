import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DailyChallenges from "../Screens/DailyChallenges";
import MainGame from "../Screens/MainGame";
import Home from "../Screens/Home";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DailyChallenges" component={DailyChallenges} />
      <Stack.Screen name="GameScreen" component={MainGame} />
    </Stack.Navigator>
  );
};

export default AppStack;
