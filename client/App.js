import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

// Enable screens before navigation container
enableScreens();

// Import your components
import Intro from "./src/pages/Intro";
import Login from "./src/pages/Login";
import SignUp from "./src/pages/SignUp";
import Dashboard from "./src/pages/Dashboard";
import Blogs from "./src/pages/Blogs";
import DocsInfo from "./src/pages/DocsInfo";
import GovSchemes from "./src/pages/GovSchemes";
import NGO from "./src/pages/NGO";
import Profile from "./src/pages/Profile";
import ProfileEdit from "./src/pages/ProfileEdit";
import LangSelection from './src/pages/LangSelection';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error);
    console.log('ErrorInfo:', errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Something went wrong!
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Error: {this.state.error?.toString()}
          </Text>
          <Text style={{ color: 'red' }}>
            Location: {this.state.errorInfo?.componentStack?.toString().split('\n')[1]}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("isLoggedIn");
        setIsLoggedIn(data === "true");
      } catch (error) {
        console.error('AsyncStorage error:', error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen name="Home" component={Dashboard} />
              <Stack.Screen name="Blogs" component={Blogs} />
              <Stack.Screen name="Docs" component={DocsInfo} />
              <Stack.Screen name="NGO" component={NGO} />
              <Stack.Screen name="GovSchemes" component={GovSchemes} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
              <Stack.Screen name="LangSelection" component={LangSelection} />
            </>
          ) : (
            <>
              <Stack.Screen name="Intro" component={Intro} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="LangSelection" component={LangSelection} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}