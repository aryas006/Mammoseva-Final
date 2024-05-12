import { View, Text, Image, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import logo from "../../assets/Logo.png";
import Cal from "../components/Calendar";
import { useFonts } from "expo-font";

const Dashboard = () => {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat/Montserrat.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View
      style={{
        backgroundColor: "#FDE1E5",
        width: "100%",
        height: "100%",
        display: "flex",
        paddingTop: 80,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Cal />
      <View
        style={{
          backgroundColor: "#FFCFDF",
          padding: 5,
          width: "90%",
          height: "40%",
          margin: 20,
          borderRadius: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Image
          source={logo}
          resizeMode="contain"
          style={{ width: "50%", height: "50%", margin: 10 }}
        />
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            width: "60%",
          }}
        >
          Get ready for the checkup in 2 days
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Content 2</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Content 3</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Content 4</Text>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  image: {
    width: "80%",
    height: "50%",
    marginBottom: 20,
  },
  content: {
    backgroundColor: "white",
    width: "90%",
    height: 100,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
