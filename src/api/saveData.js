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
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateCoinsAPI = async (coins, email) => {
  const token = await AsyncStorage.getItem("@token");
  let data = {
    email: email,
    coins: Math.abs(coins),
  };

  let config;

  if (coins > 0) {
    config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}coins/add`,
      headers: {
        accept: "application/json",
        Authorization: JSON.parse(token),
        "Content-Type": "application/json",
      },
      data: data,
    };
  } else if (coins < 0) {
    config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${API_URL}coins/use`,
      headers: {
        accept: "application/json",
        Authorization: JSON.parse(token),
        "Content-Type": "application/json",
      },
      data: data,
    };
  }

  try {
    return await axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateHintsAPI = async (hints, email) => {
  console.log("here2")
  const token = await AsyncStorage.getItem("@token");
  let data = {
    email: email,
    hints: Math.abs(hints),
  };

  let config;

  if (hints > 0) {
    config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_URL}hints/add`,
      headers: {
        accept: "application/json",
        Authorization: JSON.parse(token),
        "Content-Type": "application/json",
      },
      data: data,
    };
  } else if (hints < 0) {
    config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${API_URL}hints/use`,
      headers: {
        accept: "application/json",
        Authorization: JSON.parse(token),
        "Content-Type": "application/json",
      },
      data: data,
    };
  }

  try {
    return await axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};
