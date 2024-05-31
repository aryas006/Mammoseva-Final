import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const Calendar = ({ currentDay, periodDate }) => {
  // Function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the number of days in the current month
  const daysInMonth = getDaysInMonth(new Date().getFullYear(), new Date().getMonth());
  // Generate an array of days from 1 to the number of days in the month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Function to check if a given day is today
  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === new Date().getMonth() && today.getFullYear() === new Date().getFullYear();
  };

  // Function to check if a given day is the periodDate
  const isPeriodDate = (day) => {
    const date = new Date(periodDate);
    return date.getDate() === day && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={days}
        horizontal
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.dayContainer,
              isToday(item) && styles.today,
              isPeriodDate(item) && styles.periodDate,
            ]}
          >
            <Text style={styles.dayText}>{item}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    marginVertical: 10,
  },
  dayContainer: {
    backgroundColor: "white",
    padding: 20,
    borderColor: "white",
    marginHorizontal: 2,
    borderRadius: 10,
    borderWidth: 2,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "light",
    color: "black",
  },
  today: {
    backgroundColor: "#FFDD94", // Color for today's date
  },
  periodDate: {
    backgroundColor: "#FF55AB", // Color for the period date
  },
});

export default Calendar;
