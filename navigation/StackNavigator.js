import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import Post from "../screens/Post";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
};

export default StackNavigator;