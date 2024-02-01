import React, { Component, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Header, Todos } from "../components/export";
import { Bars3Icon } from "react-native-heroicons/outline";
import { StackParamList } from "../routes/stackRoute";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabList } from "../routes/homeroute";
import { useNavigation } from "@react-navigation/native";

export default function HomePage() {
  const addnav = useNavigation<BottomTabNavigationProp<RootTabList>>();
  const nav = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [language, setLanguage] = useState();
  const languages = ["Python", "Javascript", "Typescript"];
  const category = ["All", "Study", "Work", "Games", "Sports"];
  const [userCategory, setUserCategory] = useState({
    title: "",
  });
  return (
    <View className="mt-5">
      <Header />
      <View className=" mt-10 px-5 flex-row justify-between ">
        <Text className=" text-5xl font-light ">TODO LIST</Text>
        <TouchableOpacity
          onPress={() => addnav.navigate("AddPage")}
          className="h-10 w-10  border-2 border-solid border-black rounded-lg items-center justify-center"
        >
          <Text className=" text-3xl">+</Text>
        </TouchableOpacity>
      </View>
      <View className="px-5 mt-5 flex-row items-center justify-between">
        <View className="h-10 w-40 bg-gray-300 rounded-lg justify-center">
          <Picker
            selectedValue={language}
            onValueChange={(itemvalue, itemindex) => setLanguage(itemvalue)}
          >
            {languages.map((element, i) => {
              return <Picker.Item key={i} label={element} value={element} />;
            })}
          </Picker>
        </View>
        <TouchableOpacity>
          <Bars3Icon size={35} color={"gray"} style={{ marginRight: 4 }} />
        </TouchableOpacity>
      </View>
      <View className="mt-5 px-2">
        <FlatList
          horizontal
          data={category}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setUserCategory({ title: item })}
              className=" flex-1 border-2 border-solid border-black mr-3 p-2 rounded-md"
            >
              <Text className="  text-base font-medium">#{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View className="mt-5 px-5">
        <Todos
          category={userCategory}
          navigation={(item: string) => nav.navigate("Update", { item: item })}
        />
      </View>

      <View className=" flex-row justify-evenly mt-5"></View>
    </View>
  );
}
