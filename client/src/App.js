import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import LangSelection from './pages/LangSelection'

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
