import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translations } from "../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [translation, setTranslation] = useState({});
  const [language, setLanguage] = useState('English'); // Added state for language
  const navigation = useNavigation();

  useEffect(() => {
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

  const handleLogin = () => {
    console.log("Logging in...");
    const userData = { email, password };

    axios.post("http://192.168.0.106:9000/login", userData)
      .then(async (res) => {
        console.log(res.data);

        if (res.status === 200) {
          await AsyncStorage.setItem("token", res.data.data);
          await AsyncStorage.setItem("isLoggedIn", "true");
          Alert.alert("Logged in Successfully", "", [
            { text: "OK", onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            }) },
          ]);
        } else {
          Alert.alert("Login failed", res.data.message || "Unknown error");
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Login failed", "An error occurred. Please try again.");
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="always">
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>{translation[1]}</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 5 }} onPress={() => navigation.navigate("SignUp")}>
          <Text>Don't have an account? Sign Up Here</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDE1E5",
  },
  scrollView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
    marginLeft: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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

export default Login;
