import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert,
  Platform,
  SafeAreaView,
} from "react-native";
import Calendar from "../components/Calendar";
import { LinearGradient } from "expo-linear-gradient";
import Nav from "../components/Nav";
import { useNavigation } from "@react-navigation/native";
import Carousel from "../components/Carousel";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translations } from "../utils";
import { useFocusEffect } from "@react-navigation/native";

const greetingTranslations = [
  {
    English: "Good Morning",
    Hindi: "सुप्रभात",
    Marathi: "सुप्रभात",
  },
  {
    English: "Good Afternoon",
    Hindi: "शुभ अपराह्न",
    Marathi: "शुभ दुपार",
  },
  {
    English: "Good Evening",
    Hindi: "शुभ संध्या",
    Marathi: "शुभ संध्याकाळ",
  },
];

const Dashboard = () => {
  const [num, setNum] = useState(0);
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [greeting, setGreeting] = useState("Good Morning");
  const [language, setLanguage] = useState("English");
  const [translation, setTranslation] = useState({});
  const [periodDate, setPeriodDate] = useState(null);

  const handleBackPress = async () => {
    if (Platform.OS === "android") {
      Alert.alert("Exit", "Are you sure you wish to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Exit",
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === "android") {
        BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      }

      return () => {
        if (Platform.OS === "android") {
          BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        }
      };
    }, [])
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await axios.post(
            "https://deploy-mammo-back.onrender.com/userdata",
            { token }
          );
          setUserData(response.data.data);

          const periodDate = new Date(response.data.data.periodDate);
          setPeriodDate(periodDate);

          const targetDate = new Date(periodDate);
          targetDate.setDate(periodDate.getDate() - 5);
          const currentDate = new Date();
          const timeDifference = targetDate - currentDate;
          const dayDifference = Math.ceil(
            timeDifference / (1000 * 60 * 60 * 24)
          );
          setNum(dayDifference);

          console.log(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getData();

    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      let greetingIndex;

      if (currentHour < 12) {
        greetingIndex = 0; // Morning
      } else if (currentHour < 18) {
        greetingIndex = 1; // Afternoon
      } else {
        greetingIndex = 2; // Evening
      }

      setGreeting(greetingTranslations[greetingIndex][language]);
    };

    const getLanguagePreference = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (savedLanguage) {
          setLanguage(savedLanguage);
          setTranslation(
            translations.reduce((acc, item, index) => {
              acc[index] = item[savedLanguage];
              return acc;
            }, {})
          );
          updateGreeting();
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLanguagePreference();
  }, [language]);

  const handleBreastCheck = () => {
    Alert.alert(
      "Breast Self-Checking",
      "Have you performed Breast Self-Checking?",
      [
        {
          text: "No",
          onPress: () =>
            Alert.alert("Please check, as early as possible", "", [
              { text: "OK" },
            ]),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            Alert.alert(
              "Congrats! You are on your way to have a healthy breast health!",
              "",
              [{ text: "OK" }]
            ),
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={["#FF55AB", "#EFB4C8", "#FFFFFF"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.mainContent}>
            <Text style={styles.greetingText}>
              {translation[10]} {userData.name ? userData.name : "User"},{" "}
              {greeting}
            </Text>
            {periodDate && <Calendar periodStartDay={periodDate.getDate()} />}
            <TouchableOpacity onPress={handleBreastCheck}>
              <View style={styles.countdownContainer}>
                <Text style={styles.countdownText}>
                  {num} {translation[14]}
                </Text>
                <Text style={styles.countdownSubText}>{translation[15]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate("NGO")}
                style={styles.content}
              >
                <Text style={styles.buttonText}>{translation[16]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Docs")}
                style={styles.content}
              >
                <Text style={styles.buttonText}>{translation[17]}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.govSchemesButton}
              onPress={() => navigation.navigate("GovSchemes")}
            >
              <Text style={styles.buttonText}>{translation[18]}</Text>
            </TouchableOpacity>
          </View>
          <Carousel />
        </ScrollView>
        <Nav />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // To prevent content from getting cut off at the bottom
  },
  mainContent: {
    paddingTop: Platform.OS === "ios" ? 60 : 80, // Adjust padding for iOS/Android
    paddingHorizontal: 10,
  },
  greetingText: {
    fontSize: 20,
    color: "white",
    fontWeight: Platform.OS === "android" ? "normal" : "200", // Platform-specific font-weight
  },
  countdownContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  countdownText: {
    fontSize: 100,
    color: "white",
    fontWeight: Platform.OS === "android" ? "100" : "200", // Platform-specific font-weight
    textAlign: "center",
  },
  countdownSubText: {
    fontSize: 20,
    color: "white",
    fontWeight: Platform.OS === "android" ? "normal" : "200", // Platform-specific font-weight
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  content: {
    backgroundColor: "#FF55AB",
    width: "48%", // Adjust for spacing between two buttons
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: Platform.OS === "android" ? "normal" : "200", // Adjust for platform consistency
    color: "white",
    textAlign: "center",
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
  },
});

export default Dashboard;
