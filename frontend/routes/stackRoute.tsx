import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UpdatePage from "../screens/updatePage";
import HomeRoute, { RootTabList } from "./homeroute";

export type StackParamList = {
  Update: {
    item: any;
  };
  Homeroute: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function StackRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Homeroute"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Homeroute" component={HomeRoute} />
        <Stack.Screen name="Update" component={UpdatePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
