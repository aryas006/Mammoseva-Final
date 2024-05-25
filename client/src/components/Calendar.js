import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const days = Array.from({ length: 28 }, (_, i) => i + 1); // Array of days from 1 to 31

const Calendar = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={days}
        horizontal
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>Day {item}</Text>
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
});

export default Calendar;
