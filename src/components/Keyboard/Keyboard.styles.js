import { StyleSheet, Dimensions } from "react-native";
import { KEYS, COLORS } from "../../constants";

const screenWidth = Dimensions.get("window").width;
export const keyWidth = (screenWidth - 10) / KEYS[0].length;
const keyHeight = keyWidth * 1.3;

export default StyleSheet.create({
  keyboard: {
    alignSelf: "stretch",
    marginTop: "auto",
  },
  firstRow: {
    // alignSelf: "stretch",
    // width: "90%",
    paddingHorizontal: "4%",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  key: {
    width: keyWidth - 8,
    height: keyHeight - 6,
    margin: 4,
    marginVertical: 4,
    borderRadius: 5,
    backgroundColor: COLORS.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    fontSize: 16,
    color: COLORS.lightgrey,
    fontWeight: "bold",
  },

  rank: {
    fontSize: 32,
    alignContent: "center",
    justifyContent: "center",
  },
  madeBy: {
    alignSelf: "center",
    marginVertical: 10,
    color: COLORS.lightgrey,
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
