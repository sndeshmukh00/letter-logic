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

export const updateDailyChallenge = (amount) => ({
  type: "UPDATE_DAILYCHALLENGE",
  payload: amount,
});

export const updateHints = (amount) => ({
  type: "UPDATE_HINTS",
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
export const setSoundStatus = (soundStatus) => ({
  type: "SET_SOUND_STATUS",
  payload: soundStatus,
});
export const setMusicStatus = (musicStatus) => ({
  type: "SET_MUSIC_STATUS",
  payload: musicStatus,
});
export const setVibrationStatus = (vibrationStatus) => ({
  type: "SET_VIBRATION_STATUS",
  payload: vibrationStatus,
});

export const logoutUser = () => ({
  type: "LOGOUT_USER",
});
