import axios from "axios";
import { API_URL } from "../constants";

export const getUserInfo = async (email, token) => {
  try {
    // Constructing the API URL with query parameters
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API_URL}users/info?email=${email}`, // Replace API_URL + "users/info?email=" + email,,
      headers: {
        Authorization: token, // Assuming token is passed as a prop
        "Cache-Control": "no-cache", // Prevents caching
        Pragma: "no-cache", // HTTP 1.0 backward compatibility for no-cache
        "If-Modified-Since": "0", // Ensures no cached content is returned
      },
    };

    return await axios
      .request(config)
      .then((response) => {
        // Handle successful response
        if (response.status === 200) {
          return { success: true, user: response.data };
        } else {
          return { success: false };
        }
      })
      .catch((error) => {
        return { success: false };
      });
  } catch (error) {
    return { success: false };

    console.error("Error fetching user info:", error);
  }
};
