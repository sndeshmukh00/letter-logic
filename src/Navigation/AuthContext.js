import React, { createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../api/auth";
import { getUserInfo, syncLocalDataToOnline } from "../api/getUserInfo";
import {
  setUserData,
  setLoginStatus,
  logoutUser,
  setSettings,
} from "../store/actions/setUserData";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const muteMusic = useSelector((state) => state.muteMusic);
  const muteSounds = useSelector((state) => state.muteSounds);
  const muteVibrations = useSelector((state) => state.muteVibrations);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("@token");
        const userData = await AsyncStorage.getItem("userData");
        if (token && userData) {
          dispatch(setLoginStatus(true));
          dispatch(setUserData(JSON.parse(userData)));
        } else {
          dispatch(setLoginStatus(false));
          if (userData) {
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkLoginStatus();
  }, [dispatch]);

  useEffect(() => {
    const checkSettings = async () => {
      try {
        const settings = await AsyncStorage.getItem("settings");
        console.log(settings);
        if (settings) {
          dispatch(setSettings(JSON.parse(settings)));
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkSettings();
  }, [dispatch]);

  const useLogin = async (userData) => {
    const response = await login(userData.email, userData.password);
    if (response.success) {
      try {
        await AsyncStorage.setItem("@token", JSON.stringify(response.token));
        const userDataResponse = await getUserInfo(
          userData.email,
          response.token
        );
        if (userDataResponse && userDataResponse.success) {
          const localUserData = JSON.parse(
            await AsyncStorage.getItem("userData")
          );
          // Sync local data to online if user is new
          if (
            // localUserData &&
            userDataResponse &&
            userDataResponse.user.coins === 500 &&
            userDataResponse.user.level === 1
          ) {
            const updatedUserData = {
              coins: localUserData.coins,
              level: localUserData.level,
              dailyChallenge: localUserData.dailyChallenge,
              email: userData.email,
            };
            try {
              const syncResponse = await syncLocalDataToOnline(
                (userData = updatedUserData),
                (token = response.token)
              );
              if (syncResponse.success)
                dispatch(setUserData(syncResponse.user));
              console.log("syncResponse", syncResponse);
            } catch (error) {
              console.error(error);
            }
          } else {
            dispatch(setUserData(userDataResponse.user));
          }
          dispatch(setLoginStatus(true));
          return { success: true, message: "Login successful!" };
        } else return { message: "Something went wrong!" };
      } catch (error) {
        console.error("herrrr - ", error);
      }
    } else {
      alert(response.message);
    }
  };

  const useLogout = async () => {
    try {
      dispatch(logoutUser());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        useLogin,
        useLogout,
        muteMusic,
        muteSounds,
        muteVibrations,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
