import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
    <TouchableOpacity onPress={onAddCoins} disabled={onAddCoins === false}> 

      <View style={[styles.capsule, { backgroundColor: "#080808ee" }]}>
        <MaterialIcons
          name="stars"
          size={25}
          color="#f4ac03"
          style={styles.coinIcon}
        />

        <Text
          style={[
            styles.coinsText,
            onAddCoins !== false ? {} : { marginRight: 8, alignSelf: "center" },
          ]}
        >
          {coin}
        </Text>
        {onAddCoins !== false && (
          // <TouchableOpacity onPress={onAddCoins}>
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
  coinIcon: {
    marginRight: 8,
  },
  coinsText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  plusIcon: {
    marginLeft: 8,
  },
});

export default CoinCapsule;
