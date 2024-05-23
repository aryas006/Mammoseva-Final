import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // You can choose another icon set if you prefer

const Nav = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Blogs")}
      >
        <Icon name="book" size={30} color="#000" />
        <Text style={styles.label}>Blogs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Home")}
      >
        <Icon name="home" size={30} color="#000" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="user" size={30} color="#000" />
        <Text style={styles.label}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: 80,
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFF", // Add a background color if needed
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: "#000",
  },
});
