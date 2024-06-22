import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { AuthContext, AuthProvider } from "./AuthContext";

const AppNavigator = () => {
  const Stack = createStackNavigator();

  const { isLoggedIn } = useContext(AuthContext);

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
