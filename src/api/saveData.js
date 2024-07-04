// API logic to save level data to database
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants";
import axios from "axios";

export const updateLevelAPI = async (level, email) => {
  const token = await AsyncStorage.getItem("@token");
  let data = {
    email: email,
    level: level,
  };

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${API_URL}levels/set`,
    headers: {
      accept: "application/json",
      Authorization: JSON.parse(token),
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    console.info("Updating level... - ", config);
    return await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};
