import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from 'react-native-paper';

const LangSelection = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const navigation = useNavigation();
  const [checked, setChecked] = useState('English');

  // const handleLogin = () => {
  //   console.log("Logging in...");
  //   const userData = { email, password };

  //   axios.post("http://192.168.0.106:9000/login", userData)
  //     .then(async (res) => {
  //       console.log(res.data);

  //       if (res.status === 200) {
  //         await AsyncStorage.setItem("token", res.data.data);
  //         await AsyncStorage.setItem("isLoggedIn", "true");
  //         Alert.alert("Logged in Successfully", "", [
  //           {
  //             text: "OK", onPress: () => navigation.reset({
  //               index: 0,
  //               routes: [{ name: "Home" }],
  //             })
  //           },
  //         ]);
  //       } else {
  //         Alert.alert("Login failed", res.data.message || "Unknown error");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       Alert.alert("Login failed", "An error occurred. Please try again.");
  //     });
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Select Your Language</Text>
      <View style={styles.radioGroup}>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="English"
            status={checked === 'English' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('English')}
          />
          <Text style={styles.radioButtonLabel}>English</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="Marathi"
            status={checked === 'Marathi' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Marathi')}
          />
          <Text style={styles.radioButtonLabel}>Marathi</Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="Hindi"
            status={checked === 'Hindi' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('Hindi')}
          />
          <Text style={styles.radioButtonLabel}>Hindi</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FDE1E5",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  radioGroup: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButtonLabel: {
    fontSize: 18,
    marginLeft: 8,
  },
  button: {
    width: "100%",
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

export default LangSelection;
