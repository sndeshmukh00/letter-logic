import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { AuthContext, AuthProvider } from "./AuthContext";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserData } from "../store/actions/setUserData";
import { getUserInfo } from "../api/getUserInfo";

const AppNavigator = () => {
  const Stack = createStackNavigator();
  const { isLoggedIn } = useContext(AuthContext);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isLoggedIn) {
          const token = await AsyncStorage.getItem("@token");
          const userData = await AsyncStorage.getItem("userData");

          const userDataResponse = await getUserInfo(userData.email, token);
          if (userDataResponse && userDataResponse.success) {
            await AsyncStorage.setItem(
              "userData",
              JSON.stringify(userDataResponse.user)
            );

            dispatch(setUserData(updatedUserData));
          } else return { message: "Something went wrong!" };
        } else {
          // Fetch data from AsyncStorage if not logged in
          const userData = await AsyncStorage.getItem("userData");
          if (userData) {
            dispatch(setUserData(JSON.parse(userData)));
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [isLoggedIn, dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AppStack"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AppStack" component={AppStack} />
        {!isLoggedIn && (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{
              animationTypeForReplace: isLoggedIn ? "pop" : "push",
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

export default App;
