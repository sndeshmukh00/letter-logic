// API logic to save level data to database

import { API_URL } from "../constants";
import axios from "axios";

export const saveLevel = async (level) => {
  try {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    const JWTToken = await getJWT();
    const data = {
      level: level,
      email: user.email,
      JWTToken: JWTToken,
    };
    const response = await axios.post(API_URL + "levels", data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  return response.data;
};
