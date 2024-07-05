import { View, Text, Pressable, TouchableWithoutFeedback } from "react-native";
import { KEYS, ENTER, CLEAR, COLORS } from "../../constants";
import styles, { keyWidth } from "./Keyboard.styles";
import { useState } from "react";
import { MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const Keyboard = ({
  onKeyPressed = () => {},
  handleHint = () => {},
  greenCaps = [],
  hintedKey = [],
  yellowCaps = [],
  greyCaps = [],
  enterEnabled = false,
}) => {
  const vibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  };
  const [globalRank, setGlobalRank] = useState(1);

  const isLongButton = (key) => {
    return key === CLEAR;
  };

  const getKeyBGColor = (key) => {
    if (greenCaps.includes(key)) {
      return COLORS.primary;
    }
    if (yellowCaps.includes(key)) {
      return COLORS.secondary;
    }
    if (greyCaps.includes(key)) {
      return COLORS.darkgrey;
    }
    if (hintedKey.includes(key)) {
      return COLORS.primary;
    }
    return COLORS.grey;
  };

  return (
    <View style={styles.keyboard}>
      <View style={styles.firstRow}>
        {/* <Text style={styles.rank}>🌎</Text> */}
        <FontAwesome6
          style={styles.rank}
          name={"ranking-star"}
          size={36}
          color="#a2ff00"
        />

        <Pressable
          onPress={() => onKeyPressed(ENTER)}
          style={[
            styles.key,
            { width: keyWidth * 2.5 },
            {
              backgroundColor: enterEnabled ? COLORS.primary : COLORS.darkgrey,
            },
          ]}
        >
          <Text style={styles.keyText}>SUBMIT</Text>
        </Pressable>
        <Pressable onPress={() => handleHint()} style={styles.hintKey}>
          <MaterialCommunityIcons
            style={styles.rank}
            name={"lightbulb-on"}
            size={36}
            color="#ffcc00"
          />
        </Pressable>
      </View>
      {KEYS.map((keyRow, i) => (
        <View style={styles.row} key={`row-${i}`}>
          {keyRow.map((key) => (
            <TouchableWithoutFeedback
              onPress={() => {
                vibrate();
                onKeyPressed(key);
              }}
              disabled={greyCaps.includes(key)}
              key={key}
            >
              <View
                style={[
                  styles.key,
                  isLongButton(key) ? { width: keyWidth * 1.4 } : {},
                  { backgroundColor: getKeyBGColor(key) },
                ]}
              >
                <Text style={styles.keyText}>{key.toUpperCase()}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      ))}
      <View>
        <Text style={styles.madeBy}>Made with ❤️ in India.</Text>
      </View>
    </View>
  );
};

export default Keyboard;
