export const setUserData = (userData) => ({
  type: "SET_USER_DATA",
  payload: userData,
});

export const updateCoins = (amount) => ({
  type: "UPDATE_COINS",
  payload: amount,
});

export const updateLevel = (amount) => ({
  type: "UPDATE_LEVEL",
  payload: amount,
});

export const syncLocalToOnline = (userData) => ({
  type: "SYNC_LOCAL_TO_ONLINE",
  payload: userData,
});

export const setLoginStatus = (isLoggedIn) => ({
  type: "SET_LOGIN_STATUS",
  payload: isLoggedIn,
});

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});
