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
  },
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
      console.log(state.user.level + action.payload);
      return {
        ...state,
        user: { ...state.user, level: state.user.level + action.payload },
      };
    case "SET_LOGIN_STATUS":
      return {
        ...state,
        isLoggedIn: action.payload,
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
