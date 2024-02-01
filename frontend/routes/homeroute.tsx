import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage, AddPage } from "../screens/export";
import { HomeIcon, PencilIcon } from "react-native-heroicons/outline";

export type RootTabList = {
  HomePage: undefined;
  AddPage: undefined;
};
const Tab = createBottomTabNavigator<RootTabList>();

export default class HomeRoute extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontFamily: "rubik", fontSize: 12 },
          tabBarActiveTintColor: "blue",
        }}
      >
        <Tab.Screen
          name="HomePage"
          component={HomePage}
          options={{
            tabBarIcon: ({ focused }) => (
              <HomeIcon size={24} color={focused ? "blue" : "gainsboro"} />
            ),
          }}
        />
        <Tab.Screen
          name="AddPage"
          component={AddPage}
          options={{
            tabBarIcon: ({ focused }) => (
              <PencilIcon size={24} color={focused ? "blue" : "gainsboro"} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
