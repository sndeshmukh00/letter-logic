import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import moment from "moment";

const DailyChallenges = ({ onSelectDay }) => {
  const [currentDate, setCurrentDate] = useState(moment());

  const generateDaysInMonth = (date) => {
    const startOfMonth = moment(date).startOf("month");
    const endOfMonth = moment(date).endOf("month");
    const days = [];
    for (let i = startOfMonth; i <= endOfMonth; i.add(1, "day")) {
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
    onSelectDay(day);
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
        keyExtractor={(item) => item.format("YYYY-MM-DD")}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.day}
            onPress={() => handleSelectDay(item)}
          >
            <Text style={styles.dayText}>{item.format("D")}</Text>
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
    flex: 1,
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
  dayText: {
    fontSize: 16,
  },
});

export default DailyChallenges;
