import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { FlatList } from "react-native-gesture-handler";

const PurchasePopup = ({ isVisible, onClose }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: 1,
      name: "Starter Bundle",
      coins: 1000,
      hints: 5,
      price: "80₹",
      animation: require("../../../assets/celebration1.json"),
    },
    {
      id: 2,
      name: "Deluxe Bundle",
      coins: 2200,
      hints: 12,
      price: "150₹",
      animation: require("../../../assets/celebration1.json"),
    },
    {
      id: 3,
      name: "Value Bundle",
      coins: 5000,
      hints: 20,
      price: "220₹",
      animation: require("../../../assets/celebration1.json"),
    },
    {
      id: 4,
      name: "Premium Bundle",
      coins: 20000,
      hints: 100,
      price: "699₹",
      animation: require("../../../assets/celebration1.json"),
    },
    {
      id: 5,
      name: "Free Coins by watching Ads",
      coins: 100,
      price: "Free",
      animation: require("../../../assets/celebration1.json"),
    },
    {
      id: 6,
      name: "Free Hint by watching Ads",
      hints: 1,
      price: "Free",
      animation: require("../../../assets/celebration1.json"),
    },
  ];

  const productCard = (pkg) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardChild}>
          <View style={styles.info}>
            <Text>{pkg.name}</Text>
            <>
              <Text style={{ fontSize: 16 }}>
                {pkg.coins && (
                  <>
                    <Image
                      style={styles.icons}
                      source={require("../../../assets/coin.png")}
                    />{" "}
                    {pkg.coins} Coins{" "}
                  </>
                )}
                {pkg.hints && (
                  <>
                    <MaterialCommunityIcons
                      style={styles.icons}
                      name={"lightbulb-on"}
                      size={24}
                      color="#f4ac03"
                    />
                    {pkg.hints} Hints
                  </>
                )}
              </Text>
            </>
          </View>
          <Text style={styles.price}>{pkg.price}</Text>
        </View>
        {/* <Image src={} /> */}
      </View>
    );
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={styles.title}>Coin Store</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Entypo
              name="cross"
              size={36}
              color={COLORS.lightgrey}
              style={styles.closeButtonIcon}
            />
            {/* <Text style={styles.closeButtonIcon}>X</Text> */}
          </TouchableOpacity>
        </View>
        <View style={styles.packageContainer}>
          <View style={{ flex: 1, marginBottom: 50 }}>
            <FlatList
              data={packages}
              renderItem={({ item }) => productCard(item)}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{
                flexGrow: 1,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    height: "100%",
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: COLORS.lightgrey,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    position: "absolute",
    top: -6,
    borderRadius: 60,
    right: 0,
    backgroundColor: "transparent",
  },
  closeButtonIcon: {
    color: "red",
    padding: 4,
  },
  card: {
    width: "100%",
    backgroundColor: "#dedede",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 20,
    boxShadow: "10 10 35 0 #dedede",
  },

  cardChild: {
    margin: 4,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    justifyContent: "space-evenly",
    borderRadius: 8,
    padding: 10,
  },
  info: {
    borderRadius: 8,
    justifyContent: "space-evenly",
    // padding: 10,
    paddingHorizontal: 16,
    flexDirection: "column",
    width: "100%",
  },
  packageContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  package: {
    padding: 10,
  },
  icons: {
    width: 24,
    height: 24,
    marginBottom: 10,
  },
  price: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default PurchasePopup;
