import React, { Component, useEffect, useState } from "react";
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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../routes/stackroute";
import { useRoute, RouteProp } from "@react-navigation/native";

//receiving route prop
interface BackNavigation {
  navigation: NativeStackNavigationProp<StackParamList, "HomeRoute">;
}

export default function UpdatePage({ navigation }: BackNavigation) {
  const { todo, dispatch } = useTodoContext();
  const route = useRoute<RouteProp<StackParamList, "Update">>();
  const [title, setTitle] = useState("");
  const dateNow = new Date();
  const [date, setDate] = useState();
  const [todos, setTodo] = useState("");
  const [category, setCategory] = useState("");
  const categories = ["Study", "Work", "Games", "Sports"];
  const [colors, setColors] = useState(NaN);
  const color = [
    "rgba(128, 188, 189, 1)",
    "rgba(170, 217, 187, 1)",
    "rgba(213, 240, 193, 1)",
    "rgba(249, 247, 201, 1)",
  ];
  const ItemId = route.params["ItemId"]["itemId"];

  useEffect(() => {
    const userTodo = todo.filter((element: any) => element._id === ItemId);

    //the exact object
    const todoData = userTodo[0];

    const userTitle = todoData["title"];
    const userNote = todoData["content"];
    const userDate = todoData["day"];
    const userCategory = todoData["category"];
    const userColor = todoData["color"];

    setTitle(userTitle);
    setTodo(userNote);
    setDate(userDate);
    setCategory(userCategory);
    setColors(userColor);

    console.log(userTitle);
  }, []);

  //add data
  const UpdateTodo = async () => {
    const userTodo = { title, category, dateNow, todos, colors };

    try {
      const res = await axios.patch(
        `http://192.168.254.161:4000/data/todos/${ItemId}`,
        {
          title: userTodo.title,
          category: userTodo.category,
          day: userTodo.dateNow.toDateString(),
          content: userTodo.todos,
          color: userTodo.colors,
        }
      );

      if (res.status === 200) {
        setTitle("");
        setCategory("");
        setTodo("");
        setColors(NaN);
        console.log(res.data);
        dispatch({ type: "UPDATE_TODO", payload: res.data });
        navigation.pop();
      }
    } catch (error) {
      console.log(error, "Data insertion Failed");
    }
  };

  return (
    <View className="flex-1 mt-5">
      <Header />
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
              {date ? date : dateNow.toDateString()}
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
            value={todos}
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
          onPress={() => navigation.pop()}
          className="h-10 w-28 bg-gray-300 items-center justify-center rounded-md"
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: color[2] }}
          className="h-10 w-32 items-center justify-center rounded-md"
          onPress={() => UpdateTodo()}
        >
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
