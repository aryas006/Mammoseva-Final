import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const cycleLength = 7;
const bufferDays = 5;

const Calendar = ({ periodStartDay }) => {
  // Function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the number of days in the current month
  const daysInMonth = getDaysInMonth(
    new Date().getFullYear(),
    new Date().getMonth()
  );

  // Generate an array of days from 1 to the number of days in the month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Function to check if a given day is within the menstruation period
  const isMenstruationDay = (day) => {
    const adjustedStartDay = periodStartDay % daysInMonth;
    return (
      (day >= adjustedStartDay && day < adjustedStartDay + cycleLength) ||
      (adjustedStartDay + cycleLength > daysInMonth &&
        day < (adjustedStartDay + cycleLength) % daysInMonth)
    );
  };

  // Function to check if a given day is the first day of the buffer period before menstruation
  const isBufferStartDay = (day) => {
    const adjustedStartDay = periodStartDay % daysInMonth;
    const firstBufferDay = adjustedStartDay - bufferDays;
    return firstBufferDay < 1
      ? day === daysInMonth + firstBufferDay
      : day === firstBufferDay;
  };

  // Function to check if a given day is the last day of the buffer period after menstruation
  const isBufferEndDay = (day) => {
    const adjustedEndDay = (periodStartDay + cycleLength - 1) % daysInMonth;
    const lastBufferDay = adjustedEndDay + bufferDays;
    return lastBufferDay > daysInMonth
      ? day === lastBufferDay - daysInMonth
      : day === lastBufferDay;
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
              isMenstruationDay(item) && styles.menstruationDay,
              isBufferStartDay(item) &&
                !isMenstruationDay(item) &&
                styles.bufferDay,
              isBufferEndDay(item) &&
                !isMenstruationDay(item) &&
                styles.bufferDay,
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
  menstruationDay: {
    backgroundColor: "#FF55AB", // Color for the menstruation days
  },
  bufferDay: {
    backgroundColor: "red", // Color for the buffer days
  },
});

export default Calendar;
