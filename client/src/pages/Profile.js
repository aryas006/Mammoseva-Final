import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Profile = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("user@example.com");
  const [username, setUsername] = useState("username123");
  const [dayOfCycle, setDayOfCycle] = useState("5");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

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
          console.log(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getData();
  }, []);

  const handleEdit = () => {
    // console.log("Profile updated:", { email, username, dayOfCycle, password });
    console.log("Editing profile...")
    navigation.navigate("ProfileEdit");
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem("isLoggedIn", "false");
    await AsyncStorage.setItem("token", "");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <LinearGradient
      colors={["#FF55AB", "#EFB4C8", "#FFFFFF"]}
      style={{ height: "100%", width: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.info}>{userData.name}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{userData.email}</Text>
        </View>


        <View style={styles.infoContainer}>
          <Text style={styles.label}>Period Date:</Text>
          <Text style={styles.info}>{userData.periodDate}</Text>
        </View>

        {/* <View style={styles.infoContainer}>
          <Text style={styles.label}>Password:</Text>
          <Text style={styles.info}>{password}</Text>
        </View> */}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginHorizontal: 10,
            gap: 12,
          }}
        >
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#CE196A",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#CE196A",
  },
  info: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  },
  button: {
    width: "50%",
    backgroundColor: "#CE196A",
    paddingVertical: 20,
    marginTop: 20,
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

export default Profile;
