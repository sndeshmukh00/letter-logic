import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../api/auth";
import { getUserInfo } from "../api/getUserInfo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("@token");
      if (!token) {
        setIsLoggedIn(false);
        // setUser(JSON.parse(userData));
      } else {
        try {
          const userData = await AsyncStorage.getItem("user");
          if (userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    checkLoginStatus();
  }, []);

  const useLogin = async (userData) => {
    const response = await login(userData.email, userData.password);
    console.log("jdfhsd - ", response);

    if (response.success) {
      try {
        await AsyncStorage.setItem("@token", JSON.stringify(response.token));
        const userDataResponse = await getUserInfo(
          userData.email,
          response.token
        );
        if (userDataResponse && userDataResponse.success) {
          setIsLoggedIn(true);
          setUser(userDataResponse.user);
          await AsyncStorage.setItem(
            "user",
            JSON.stringify(userDataResponse.user)
          );
        } else return { message: "Something went wrong!" };
      } catch (error) {
        console.error(error);
      }
    } else {
      alert(response.message);
    }
  };

  const useLogout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, useLogin, useLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
