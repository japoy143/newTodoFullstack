import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage, AddPage } from "../screens/export";
import { HomeIcon, PencilIcon } from "react-native-heroicons/outline";

const Tab = createBottomTabNavigator();

export default class HomeRoute extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarLabelStyle: { fontFamily: "rubik", fontSize: 12 },
            tabBarActiveTintColor: "blue",
          }}
        >
          <Tab.Screen
            name="Home"
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
      </NavigationContainer>
    );
  }
}
