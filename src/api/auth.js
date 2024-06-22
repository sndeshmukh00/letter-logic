import axios from "axios";
import { API_URL } from "../constants";

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "auth", {
      email,
      password,
    });

    // console.log("Auth resp - ", response);
    if (response.status === 200) {
      const { token } = response.data;
      return { success: true, token };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Login error", error);
    return { success: false, message: "An error occurred" };
  }
};
