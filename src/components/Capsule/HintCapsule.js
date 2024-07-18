import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const HintCapsule = ({ hints, onAddHints }) => {
  const [hint, setHint] = useState(hints);
  function hintConvertor(n, d) {
    if (!n) return setHint(0);
    else if (n < 1000) return setHint(n);
    (x = ("" + n).length), (p = Math.pow), (d = p(10, d));
    x -= x % 3;
    setHint(Math.round((n * d) / p(10, x)) / d + " kMGTPE"[x / 3]);
  }
  useEffect(() => {
    hintConvertor(hints, 2);
  }, [hints]);
  return (
    <TouchableOpacity onPress={onAddHints} disabled={onAddHints === false}>
      <View style={[styles.capsule, { backgroundColor: "#080808ee" }]}>
        <MaterialCommunityIcons
          style={styles.hintIcon}
          name={"lightbulb-on"}
          size={24}
          color="#f4ac03"
        />
        <Text
          style={[
            styles.hintsText,
            onAddHints !== false ? {} : { marginRight: 8, alignSelf: "center" },
          ]}
        >
          {hint}
        </Text>
        {onAddHints !== false && (
          // <TouchableOpacity onPress={onAddHints}>
            <MaterialIcons
              name="add-circle-outline"
              size={25}
              color="#2fff00"
              style={styles.plusIcon}
            />
          // </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  capsule: {
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 2,
    justifyContent: "space-between",
  },
  hintIcon: {
    marginRight: 8,
  },
  hintsText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  plusIcon: {
    marginLeft: 8,
  },
});

export default HintCapsule;
