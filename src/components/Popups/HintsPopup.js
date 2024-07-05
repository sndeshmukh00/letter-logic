import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateHints } from "../../store/actions/setUserData";
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});

const HintsPopup = ({
  visible,
  onClose,
  onWatchAd,
  onPurchase,
  useHints,
  useHintsByCoin,
}) => {
  console.log("first", visible);
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.user.coins);
  const hints = useSelector((state) => state.user.hints);

  //   For Ads
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setAdLoaded(true);
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
      }
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);
  if (!adLoaded) {
    return null;
  }

  const handleUseCoins = () => {
    if (coins >= 100) {
      useHintsByCoin();
      onClose(); // Close the popup after using coins
    } else {
      // onPurchase(); // Navigate to the purchase page if not enough coins
    }
  };
  const handleUseHint = () => {
    if (hints > 0) {
      useHints();
      onClose(); // Close the popup after using hints
    } else {
      //   onWatchAd(); // Navigate to the watch ad page if no hints left
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <LottieView
            source={require("../../../assets/hint.json")} // Your Lottie animation file
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.title}>Need a Hint?</Text>
          <Text style={styles.message}>
            Use one of your hints to reveal a letter!
          </Text>

          <Text style={styles.subMessage}>Available Hints : {hints}</Text>
          <TouchableOpacity style={styles.button} onPress={handleUseHint}>
            <Text style={styles.buttonText}>
              {hints > 0 ? "Use 1 Hint" : "Watch Ad for Hint"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.subMessage}>
            {coins >= 100 ? "Use 100 Coins to Get 1 Hint" : "Not enough coins!"}
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleUseCoins}>
            <Text style={styles.buttonText}>
              {coins >= 100 ? "Use 100 Coins" : "Purchase/Earn Coins"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  animation: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  subMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 0,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
});

export default HintsPopup;
