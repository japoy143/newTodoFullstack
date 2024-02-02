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
import axios from "axios";
import { useTodoContext } from "../hooks/useTodoContext";

export default function HomePage() {
  const { todo, dispatch } = useTodoContext();
  const addnav = useNavigation<BottomTabNavigationProp<RootTabList>>();
  const nav = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState();
  const languages = ["Python", "Javascript", "Typescript"];
  const category = ["All", "Study", "Work", "Games", "Sports"];
  const [userCategory, setUserCategory] = useState({
    title: "",
  });

  const ToggleDone = async (id: any) => {
    const todoALL = await todo.filter((element: any) => element._id === id);
    const todoObj = await todoALL[0];
    const todoIdDone = await todoObj["done"];
    console.log(!todoIdDone);
    const res = await axios.patch(
      `http://192.168.254.161:4000/data/todos/${id}`,
      {
        done: !todoIdDone,
      }
    );

    if (res.status === 200) {
      dispatch({ type: "UPDATE_DONE", payload: res.data });
      console.log(res.data);
    }
  };
  return (
    <View className="mt-5">
      <Header input={input} setInput={setInput} />
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
          input={input}
          navigation={(item: string) => nav.navigate("Update", { item: item })}
          setIsDone={(id: any) => ToggleDone(id)}
        />
      </View>

      <View className=" flex-row justify-evenly mt-5"></View>
    </View>
  );
}
