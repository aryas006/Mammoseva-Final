import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Calendar from "../components/Calendar";
import { LinearGradient } from "expo-linear-gradient";
import Nav from "../components/Nav";
import { useNavigation } from "@react-navigation/native";
import Carousel from "../components/Carousel";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translations } from "../utils";

const Dashboard = () => {
  const [num, setNum] = useState(0);
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [greeting, setGreeting] = useState("Good Morning")

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await axios.post(
            "http://192.168.0.106:9000/userdata",
            { token }
          );
          setUserData(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getData();

    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };

    updateGreeting();

    const getLanguagePreference = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (savedLanguage) {
          setLanguage(savedLanguage);
          setTranslation(translations.reduce((acc, item, index) => {
            acc[index] = item[savedLanguage];
            return acc;
          }, {}));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLanguagePreference();
  }, []);

  return (
    <LinearGradient
      colors={["#FF55AB", "#EFB4C8", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContent}>
          <Text style={styles.greetingText}>
            {translations[10]} {userData.name ? userData.name : "User"}, {greeting}
          </Text>
          <Calendar />
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>{num} {translations[14]}</Text>
            <Text style={styles.countdownSubText}>{translations[15]}</Text>
          </View>
        </View>
        <View style={{ width: "100%", padding: 10 }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("NGO")}
              style={styles.content}
            >
              <Text style={styles.buttonText}>{translations[16]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Docs")}
              style={styles.content}
            >
              <Text style={styles.buttonText}>{translations[17]}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.govSchemesButton}
            onPress={() => navigation.navigate("GovSchemes")}
          >
            <Text style={styles.buttonText}>{translations[18]}</Text>
          </TouchableOpacity>
        </View>
        <Carousel />
      </ScrollView>
      <Nav />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  mainContent: {
    paddingTop: 80,
    paddingHorizontal: 10,
  },
  greetingText: {
    fontSize: 20,
    color: "white",
    fontFamily: "sans",
    fontWeight: "light",
  },
  countdownContainer: {
    width: "100%",
    alignItems: "start",
    marginTop: 20,
  },
  countdownText: {
    fontSize: 100,
    color: "white",
    fontFamily: "sans",
    fontWeight: "100",
    textAlign: "center",
  },
  countdownSubText: {
    fontSize: 20,
    color: "white",
    fontFamily: "sans",
    fontWeight: "light",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  content: {
    backgroundColor: "#FF55AB",
    width: "50%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "sans",
    fontWeight: "light",
    color: "white",
  },
  govSchemesButton: {
    backgroundColor: "#FF55AB",
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
  },
});

export default Dashboard;