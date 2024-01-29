import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  BellAlertIcon,
} from "react-native-heroicons/outline";
export default function Header() {
  const [name, setName] = useState("");
  return (
    <View className="mt-3 px-2 ">
      <View className="flex-row items-center justify-evenly">
        <View className="h-10 w-10 bg-gray-400 rounded-full"></View>
        <View className="h-10  w-60  bg-gray-200 rounded-lg justify-center px-2 ">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Welcome Back "
            cursorColor={"gray"}
            className=" font-medium"
          />
        </View>
        <View className="flex-row ">
          <MagnifyingGlassIcon size={30} color={"gray"} />
          <View className="w-2"></View>
          <BellAlertIcon size={30} color={"gray"} />
        </View>
      </View>
    </View>
  );
}
