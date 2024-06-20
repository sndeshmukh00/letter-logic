export const COLORS = {
  black: "#121214",
  darkgrey: "#3A3A3D",
  grey: "#818384",
  lightgrey: "#D7DADC",
  primary: "#538D4E",
  secondary: "#B59F3B",
};

export const colorsToEmoji = {
  [COLORS.darkgrey]: "⬛",
  [COLORS.primary]: "🟩",
  [COLORS.secondary]: "🟧",
};

export const ENTER = "SUBMIT";
export const CLEAR = "⌫";

export const KEYS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", CLEAR],
];

export const API_URL = "https://letterlogic-api.vercel.app/api/";
