import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";

const FormDialog = ({ onClose }) => {
  const [checked, setChecked] = useState(false);

  const handleYesClick = () => {
    setChecked(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dialogContainer}>
        {checked ? (
          <View>
            <Text style={styles.wellDoneText}>Well Done!</Text>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontWeight: "Regular",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Well Done Anushka! That's one step towards your good breast health
              😃 Comeback again at 24th May
            </Text>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.title}>Have you Done Checking?</Text>
            <Text style={styles.instructionText}>
              Please Click Yes If You Have Checked with Proper Instructions
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleYesClick}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Not Yet</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default FormDialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  dialogContainer: {
    backgroundColor: "#FF55AB",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  instructionText: {
    fontSize: 15,
    marginBottom: 20,
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: "#FF55AB",
    fontSize: 16,
  },
  wellDoneText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
