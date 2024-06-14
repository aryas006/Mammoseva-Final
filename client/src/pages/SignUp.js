import React, { useEffect, useState } from "react";
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
import Logo from "../../assets/Logo.png";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { translations } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [periodDate, setPeriodDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const navigation = useNavigation();

  useEffect(() => {
    const getLanguagePreference = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (savedLanguage) {
          setSelectedLanguage(savedLanguage);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLanguagePreference();
  }, []);

  const handleSignUp = () => {
    const validationError = validateFields(name, email, password, periodDate);
    if (validationError) {
      Alert.alert(validationError);
      return;
    }
    const formattedDate = periodDate.toISOString().split("T")[0];
    console.log("Signing up...");
    const userData = {
      name,
      email,
      password,
      periodDate: formattedDate,
    };
    axios
      .post("https://deploy-mammo-back.onrender.com/register", userData)
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) {
          Alert.alert("Registered successfully", "", [
            { text: "OK", onPress: () => navigation.navigate("Login") },
          ]);
        } else {
          Alert.alert(
            "Registration failed",
            res.data.message || "Unknown error"
          );
        }
      })
      .catch((err) => console.error(err));
  };

  const validateFields = (name, email, password, periodDate) => {
    if (!name) return translations[45][selectedLanguage]; // "Name is required"
    if (!email) return translations[2][selectedLanguage]; // "Email is required"
    if (!password) return translations[3][selectedLanguage]; // "Password is required"
    if (!periodDate) return translations[7][selectedLanguage]; // "Period date is required"

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";

    if (password.length < 6) return "Password must be at least 6 characters long";

    return null;
  };

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

  const getTranslation = (index) => translations[index][selectedLanguage];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="always"
      >
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>{getTranslation(1)}</Text>
        <Text style={styles.label}>{getTranslation(45)}</Text>
        <TextInput
          style={styles.input}
          placeholder={getTranslation(4)}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.label}>{getTranslation(2)}</Text>
        <TextInput
          style={styles.input}
          placeholder={getTranslation(5)}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <Text style={styles.label}>{getTranslation(3)}</Text>
        <TextInput
          style={styles.input}
          placeholder={getTranslation(6)}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Text style={styles.label}>{getTranslation(7)}</Text>
        <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
          <Text>{periodDate.toISOString().split("T")[0]}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>{getTranslation(1)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 5 }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text>{getTranslation(8)}</Text>
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
  dateInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    justifyContent: "center",
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

export default SignUp;
