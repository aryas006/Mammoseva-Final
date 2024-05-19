import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import introImage from "../../assets/meditation.png";
import { useNavigation } from "@react-navigation/native";

const Intro = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={introImage} style={styles.image} resizeMode="contain" />
      <Text style={styles.text}>
        Welcome to our menstrual cycle tracker! Let's empower your journey with
        insights and support.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDE1E5",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "80%",
    height: "50%",
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#CE196A",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Intro;
