import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";

const ProfileEdit = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [dayOfCycle, setDayOfCycle] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [password, setPassword] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setPeriodDate(date);
    hideDatePicker();
  };

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

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const updatedData = {
          token,
          name: username,
          email,
          password,
          periodDate: dayOfCycle,
        };

        const response = await axios.put(
          "https://deploy-mammo-back.onrender.com:9000/updateData",
          updatedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          Alert.alert("Success", "Profile updated successfully");
          navigation.navigate("Profile");
        } else {
          Alert.alert("Error", response.data.message || "An error occurred while updating the profile");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "An error occurred while updating the profile");
    }
  };

  return (
    <LinearGradient
      colors={["#FF55AB", "#EFB4C8", "#FFFFFF"]}
      style={{ height: "100%", width: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Profile</Text>
        <Text style={{ color: "white" }}>Edit Your Profile here</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userData.email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={userData.name}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
          <Text>{userData.periodDate}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />



        <TextInput
          style={styles.input}
          placeholder="Password"
          value={userData.password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "start",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#CE196A",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    width: "40%",
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

export default ProfileEdit;