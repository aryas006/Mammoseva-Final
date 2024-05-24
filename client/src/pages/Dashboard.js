import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { useCallback, useState } from "react";
import Calendar from "../components/Calendar";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Nav from "../components/Nav";
import { useNavigation } from "@react-navigation/native";
import Carousel from "../components/Carousel";
import FormDialog from "../components/FormModal";
// Add this import if you are using SplashScreen

const FormDialogModal = ({ visible, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <FormDialog onClose={onClose} />
    </Modal>
  );
};

const Dashboard = () => {
  const [num, setNum] = useState(0);
  const [isModalVisible, setModalVisible] = useState(true);
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

  const handleCloseModal = () => {
    setModalVisible(false);
    setNum(0); // Example to change num after closing the modal
  };

  return (
    <LinearGradient
      colors={["#FF55AB", "#EFB4C8", "#FFFFFF"]}
      style={{ width: "100%", height: "100%" }}
    >
      {num === 0 && isModalVisible ? (
        <FormDialogModal visible={isModalVisible} onClose={handleCloseModal} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.mainContent}>
            <Text style={styles.greetingText}>Hello Anushka, Good Morning</Text>
            <Calendar />
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownText}>{num} days</Text>
              <Text style={styles.countdownSubText}>
                Remaining for Checking
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", padding: 10 }}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("NGO")}
                style={styles.content}
              >
                <View>
                  <Text style={styles.buttonText}>NGO</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Docs")}
                style={styles.content}
              >
                <View>
                  <Text style={styles.buttonText}>More Info</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.govSchemesButton}
              onPress={() => navigation.navigate("GovSchemes")}
            >
              <View>
                <Text style={styles.buttonText}>Gov Schemes</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Carousel />
        </ScrollView>
      )}
      <Nav />
    </LinearGradient>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  mainContent: {
    width: "100%",
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
    width: "90%",
  },
  countdownText: {
    fontSize: 100,
    color: "white",
    fontFamily: "sans",
    fontWeight: "100",
  },
  countdownSubText: {
    fontSize: 20,
    color: "white",
    fontFamily: "sans",
    fontWeight: "light",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  content: {
    backgroundColor: "#FF55AB",
    width: "50%",
    height: 100,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "sans",
    fontWeight: "light",
    color: "white",
  },
  govSchemesButton: {
    width: "100%",
    backgroundColor: "#FF55AB",
    height: 100,
    marginTop: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 10,
    padding: 20,
  },
});
