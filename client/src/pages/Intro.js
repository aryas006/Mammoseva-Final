import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import introImage from "../../assets/meditation.png";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
const Intro = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#FF55AB", "#EFB4C8", "#FFFFFF"]}
      style={{ height: "100%", width: "100%" }}
    >
      <View style={styles.container}>
        <Image source={introImage} style={styles.image} resizeMode="contain" />
        <Text style={styles.text}>Mammoseva</Text>
        <Text style={{ textAlign: "center", margin: 10, fontWeight: "200" }}>
          A user friendly personal breast wellness application. Promoting Early
          Detection. Providing the Right Knowledge. Catering Emotional Needs.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#CE196A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#CE196A",
    paddingVertical: 20,
    marginTop: 10,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Intro;
