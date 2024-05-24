import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Intro from "./pages/Intro";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import DocsInfo from "./pages/DocsInfo";
import GovSchemes from "./pages/GovSchemes";
import NGO from "./pages/NGO";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Blogs"
          component={Blogs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Docs"
          component={DocsInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NGO"
          component={NGO}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GovSchemes"
          component={GovSchemes}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
