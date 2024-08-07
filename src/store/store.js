import { createStore, applyMiddleware } from "redux";
import storageMiddleware from "../middlewares/storage";

// Define initial state
const initialState = {
  user: {
    _id: "",
    coins: 500,
    dailyChallenge: [],
    email: "",
    level: 1,
    name: "guest",
    streak: 0,
    hints: 2,
  },
  muteMusic: false,
  muteSounds: false,
  muteVibrations: false,
  isLoggedIn: false,
};

// Define a reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case "UPDATE_COINS":
      return {
        ...state,
        user: { ...state.user, coins: state.user.coins + action.payload },
      };
    case "UPDATE_LEVEL":
      if (action.payload === -1) {
        return { ...state, user: { ...state.user, level: 1 } };
      } else {
        return {
          ...state,
          user: { ...state.user, level: state.user.level + action.payload },
        };
      }
    case "UPDATE_DAILYCHALLENGE":
      
      return {
        ...state,
        user: {
          ...state.user,
          dailyChallenge: state.user.dailyChallenge + action.payload,
        },
      };
    case "UPDATE_HINTS":
      return {
        ...state,
        user: {
          ...state.user,
          hints: state.user.hints + action.payload,
        },
      };
    case "SET_LOGIN_STATUS":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SET_SOUND_STATUS":
      return {
        ...state,
        muteSounds: action.payload,
      };
    case "SET_MUSIC_STATUS":
      return {
        ...state,
        muteMusic: action.payload,
      };
    case "SET_VIBRATION_STATUS":
      return {
        ...state,
        muteVibrations: action.payload,
      };
    case "SET_SETTINGS":
      return {
        ...state,
        muteMusic: action.payload.muteMusic,
        muteVibrations: action.payload.muteVibrations,
        muteSounds: action.payload.muteSounds,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: initialState.user,
        isLoggedIn: false,
      };
    case "SYNC_LOCAL_TO_ONLINE":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer, applyMiddleware(storageMiddleware));

export default store;
