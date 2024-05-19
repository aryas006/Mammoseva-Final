import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Nav = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button title="Blogs" onPress={() => navigation.navigate("Blogs")} />
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
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
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: "50",
  },
});
