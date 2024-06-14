import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Intro from "./src/pages/Intro";
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import Dashboard from "./src/pages/Dashboard";
import Blogs from "./src/pages/Blogs";
import DocsInfo from "./src/pages/DocsInfo";
import GovSchemes from "./src/pages/GovSchemes";
import NGO from "./src/pages/NGO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "./src/pages/Profile";
import ProfileEdit from "./src/pages/ProfileEdit";
import LangSelection from './src/pages/LangSelection'

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    setIsLoggedIn(data === "true");
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
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
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileEdit"
              component={ProfileEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LangSelection"
              component={LangSelection}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
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
              name="LangSelection"
              component={LangSelection}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}