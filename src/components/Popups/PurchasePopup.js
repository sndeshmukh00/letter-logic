import React, { useEffect, useState } from "react";
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
import useRewardAd from "../Ads/rewaredAd";
import { updateCoins, updateHints } from "../../store/actions/setUserData";
import GeneralPopup from "./GeneralPopup";
import { useDispatch, useSelector } from "react-redux";
import CoinCapsule from "../Capsule/CoinCapsule";
import HintCapsule from "../Capsule/HintCapsule";

const PurchasePopup = ({ isVisible, onClose }) => {
  const { isLoading, isLoaded, earned, play } = useRewardAd();
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.user.coins); // Accessing the coins from Redux store
  const hints = useSelector((state) => state.user.hints); // Accessing the hints from Redux store

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [purchaseIssuePopup, setPurchaseIssuePopup ] = useState(false);
  const [showError, setShowError] = useState(null);

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

  const handlePurchase = async (pkg) => {
    if (pkg.price === "Free") {
      try {
        setSelectedPackage(pkg);
        play();
      } catch (error) {
        console.error(error);
      }
    } else {
      setSelectedPackage(pkg);
      if(pkg.id<=4){
        setPurchaseIssuePopup(true)
      }
    }
  };

  useEffect(() => {
    if (earned) {
      if (selectedPackage.name === "Free Coins by watching Ads") {
        dispatch(updateCoins(100));
      } else if (selectedPackage.name === "Free Hint by watching Ads") {
        dispatch(updateHints(1));
      } else {
        setShowError("Something went wrong! Reward not granted.");
      }
      //   onClose();
    }
  }, [earned]);

  const productCard = (pkg) => {
    return (
      <TouchableOpacity onPress={() => handlePurchase(pkg)}>
        <View
          style={[
            styles.card,
            (pkg.name === "Value Bundle" || pkg.price === "Free") &&
              styles.greenCard,
          ]}
        >
          {pkg.name === "Value Bundle" && (
            <View
              style={{
                position: "absolute",
                left: 20,
                top: -12,
                backgroundColor: COLORS.primary,
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 10,
                zIndex: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Best Selling</Text>
            </View>
          )}
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
      </TouchableOpacity>
    );
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      {isLoading && (
        <GeneralPopup
          visible={isLoading}
          onCancel={false}
          title="Loading"
          message="Please wait your ad will load soon!"
        />
      )}
      {
      purchaseIssuePopup && (
        <GeneralPopup
          visible={purchaseIssuePopup}
          onCancel={true}
          onCancelListener={() => setPurchaseIssuePopup(false)}
          title="Failed"
          message="Purchase is not available! We will bring it soon!"
          />
        )}
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
        <View
          style={{
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <CoinCapsule coins={coins} onAddCoins={false} />
          <HintCapsule hints={hints} onAddHints={false} />
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
  greenCard: {
    backgroundColor: "#4f9749ff",
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
