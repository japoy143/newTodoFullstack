import React, { Component, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../components/header";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useTodoContext } from "../hooks/useTodoContext";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootTabList } from "../routes/homeroute";

export default function AddPage() {
  const homenav = useNavigation<BottomTabNavigationProp<RootTabList>>();
  const { dispatch } = useTodoContext();
  const [title, setTitle] = useState("");
  const dateNow = new Date();
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("");
  const categories = ["Study", "Work", "Games", "Sports"];
  const [colors, setColors] = useState(NaN);
  const color = [
    "rgba(128, 188, 189, 1)",
    "rgba(170, 217, 187, 1)",
    "rgba(213, 240, 193, 1)",
    "rgba(249, 247, 201, 1)",
  ];

  //add data
  const AddTodo = async () => {
    const userTodo = { title, category, dateNow, todo, colors };

    try {
      const todos = await axios.post(
        "http://192.168.254.161:4000/data/todos",
        {
          title: userTodo.title,
          category: userTodo.category,
          day: userTodo.dateNow.toDateString(),
          content: userTodo.todo,
          color: userTodo.colors,
          done: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (todos.status === 200) {
        setTitle("");
        setCategory("");
        setTodo("");
        setColors(NaN);
        dispatch({ type: "INSERT_TODO", payload: todos.data });
      }
    } catch (error) {
      console.log(error, "Data insertion Failed");
    }
  };

  return (
    <View className="flex-1 mt-5">
      <View className="flex-1 border-2 border-solid  border-black m-4 rounded-3xl ">
        <View className="px-7 py-8 flex-row justify-between">
          <View>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              className="text-2xl px-2  text-black font-medium"
              cursorColor={"gray"}
              underlineColorAndroid="transparent"
            />
            <Text className="mt-2 pl-3 text-gray-400 font-bold">
              {dateNow.toDateString()}
            </Text>
          </View>
          <View>
            <View
              className="h-10  w-32  justify-center rounded-md  "
              style={{ backgroundColor: color[colors] }}
            >
              <Picker
                mode="dropdown"
                selectedValue={category}
                onValueChange={(itemvalue, itemindex) => {
                  setCategory(itemvalue);
                  setColors(itemindex);
                }}
              >
                {categories.map((ele, index) => {
                  return <Picker.Item key={index} value={ele} label={ele} />;
                })}
              </Picker>
            </View>
          </View>
        </View>
        <View className="flex-1 px-5 py-2">
          <TextInput
            value={todo}
            multiline={true}
            onChangeText={setTodo}
            placeholder="Note..."
            cursorColor={"gray"}
            className=" text-lg "
          />
        </View>
      </View>
      <View className="flex-row  justify-between px-12 mb-3">
        <TouchableOpacity
          onPress={() => homenav.goBack()}
          className="h-10 w-28 bg-gray-300 items-center justify-center rounded-md"
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: color[2] }}
          className="h-10 w-32 items-center justify-center rounded-md"
          onPress={() => AddTodo()}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
