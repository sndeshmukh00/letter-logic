import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { gettDailyChallengeCompleted } from "../hooks/usePersistGame";
import { COLORS } from "../constants";

const DailyChallenges = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [winningState, setWinningState] = useState([]);

  useEffect(() => {
    // const fetchWinningState = async () => {
    //   try {
    //     const storedWinningState = await AsyncStorage.getItem("winningState");
    //     const parsedWinningState = storedWinningState
    //       ? JSON.parse(storedWinningState)
    //       : [];
    //     setWinningState(parsedWinningState);
    //   } catch (error) {
    //     console.error("Failed to fetch winning state:", error);
    //   }
    // };
    gettDailyChallengeCompleted().then((data) => {
      try {
        setWinningState(data);
      } catch (error) {
        console.error("Failed to set winning state:", error);
      }
      // setWinningState(data);
    });

    // fetchWinningState();
  }, []);

  const generateDaysInMonth = (date) => {
    const startOfMonth = moment.utc(date).startOf("month");
    const endOfMonth = moment.utc(date).endOf("month");
    const days = [];
    for (
      let i = startOfMonth.clone();
      i.isSameOrBefore(endOfMonth);
      i.add(1, "day")
    ) {
      days.push(i.clone());
    }
    return days;
  };

  const daysInMonth = generateDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  const handleSelectDay = (day) => {
    const formattedDate = formatDateString(day);
    navigation.navigate("GameScreen", { date: formattedDate });
  };

  const formatDateString = (date) => {
    return `day_${date.format("YYYYMMDD")}`;
  };

  const isDayWon = (date) => {
    return winningState.includes(formatDateString(date));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.navButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{currentDate.format("MMMM YYYY")}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.navButton}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={daysInMonth}
        numColumns={5}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.format("YYYYMMDD")}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.day, isDayWon(item) && styles.wonDay]}
            onPress={() => handleSelectDay(item)}
          >
            <Text style={[styles.dayText, isDayWon(item) && styles.wonDayText]}>
              {item.format("D")}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  navButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
  day: {
    width: "16%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  wonDay: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    shadowColor: COLORS.primary,
  },
  wonDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dayText: {
    fontSize: 16,
  },
});

export default DailyChallenges;
