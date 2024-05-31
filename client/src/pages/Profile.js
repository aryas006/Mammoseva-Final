import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("user@example.com"); // Example email
  const [username, setUsername] = useState("username123"); // Example username
  const [dayOfCycle, setDayOfCycle] = useState("5"); // Example day of cycle
  const [password, setPassword] = useState(""); // Example password

  const handleEdit = () => {
    // Handle save logic here
    console.log("Profile updated:", { email, username, dayOfCycle, password });
    navigation.navigate("ProfileEdit");
  };

  return (
    <LinearGradient
      colors={["#FF55AB", "#EFB4C8", "#FFFFFF"]}
      style={{ height: "100%", width: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>{email}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.info}>{username}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Day of Cycle:</Text>
          <Text style={styles.info}>{dayOfCycle}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Password:</Text>
          <Text style={styles.info}>{password}</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginHorizontal: 10,
            gap: 12,
          }}
        >
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <Text style={styles.buttonText} onPress={navigation.navigate}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
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