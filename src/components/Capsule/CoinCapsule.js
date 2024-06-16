import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const CoinCapsule = ({ coins, onAddCoins }) => {
  const [coin, setCoin] = useState(coins);
  function coinConvertor(n, d) {
    if (!n) return setCoin(0);
    else if (n < 1000) return setCoin(n);
    (x = ("" + n).length), (p = Math.pow), (d = p(10, d));
    x -= x % 3;
    setCoin(Math.round((n * d) / p(10, x)) / d + " kMGTPE"[x / 3]);
  }
  useEffect(() => {
    coinConvertor(coins, 2);
  }, [coins]);
  return (
    <View style={[styles.capsule, { backgroundColor: "#080808ee" }]}>
      <MaterialIcons
        name="stars"
        size={25}
        color="#ffcc00"
        style={styles.coinIcon}
      />
      <Text style={styles.coinsText}>{coin}</Text>
      <TouchableOpacity onPress={onAddCoins}>
        <MaterialIcons
          name="add-circle-outline"
          size={25}
          color="#2fff00"
          style={styles.plusIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  capsule: {
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    // padding: 10,
    borderRadius: 25,
    paddingHorizontal: 2,
  },
  coinIcon: {
    marginRight: 8,
  },
  coinsText: {
    // flex: 1,
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  plusIcon: {
    marginLeft: 8,
  },
});

export default CoinCapsule;
