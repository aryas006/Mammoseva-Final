import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from 'react-native-paper';

const LangSelection = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState('English');

  const saveLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
      Alert.alert('Success', 'Language preference saved successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save the language');
    }
  };

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
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await saveLanguage(checked);
          navigation.navigate("Login");
        }}
      >
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
