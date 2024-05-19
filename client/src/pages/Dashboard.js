import { View, Text, Image, StyleSheet } from "react-native";
import React, { useCallback } from "react";
// import logo from "../../assets/Logo.png";
import Cal from "../components/Calendar";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Nav from "../components/Nav";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  const navigation = useNavigation();
  const [fontsLoaded, fontError] = useFonts({
    Montserrat: require("../../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
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
    <LinearGradient
      colors={["#FF55AB", "#EFB4C8", "#FFFFFF"]}
      style={{ height: "100%", width: "100%" }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          paddingTop: 80,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontFamily: "sans",
            fontWeight: "light",
          }}
        >
          Hello Anushka, Good Morning
        </Text>
        <Cal />

        <View
          style={{
            width: "90%",
          }}
        >
          {/* <Image
            source={logo}
            resizeMode="contain"
            style={{ width: "50%", height: "50%", margin: 10 }}
          /> */}
          <Text
            style={{
              fontSize: 100,
              color: "white",
              fontFamily: "sans",
              fontWeight: "100",
            }}
          >
            2 days
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontFamily: "sans",
              fontWeight: "light",
            }}
          >
            Remaining for Checking
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "10",
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <View style={styles.content}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "sans",
                fontWeight: "light",
              }}
              onPress={() => navigation.navigate("NGO")}
            >
              NGO
            </Text>
          </View>
          <View style={styles.content}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "sans",
                fontWeight: "light",
              }}
              onPress={() => navigation.navigate("Docs")}
            >
              More Info
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: 150,
            marginTop: 5,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "sans",
              fontWeight: "light",
              padding: 20,
            }}
            onPress={() => navigation.navigate("GovSchemes")}
          >
            Gov Schemes
          </Text>
        </View>
      </View>
      <Nav />
    </LinearGradient>
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
    width: "50%",
    height: 150,
    padding: 20,

    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
