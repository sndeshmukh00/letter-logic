import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DailyChallenges from "../Screens/DailyChallenges";
import MainGame from "../Screens/MainGame";
import Home from "../Screens/Home";
import useSoundEffects from "../hooks/useSoundEffects";
import { AuthContext } from "./AuthContext";

const Stack = createStackNavigator();

const AppStack = () => {
  const { muteMusic } = useContext(AuthContext);

  const { playBGM, stopBGM } = useSoundEffects();

  useEffect(() => {
    if (!muteMusic) {
      playBGM();
    } else {
      stopBGM();
    }
  }, [muteMusic]);

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
