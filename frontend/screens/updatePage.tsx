import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Header from "../components/header";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useTodoContext } from "../hooks/useTodoContext";
import { StackParamList } from "../routes/stackRoute";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp } from "@react-navigation/native";

interface UpdateNavigation {
  navigation: NativeStackNavigationProp<StackParamList, "Homeroute">;
}

export default function UpdatePage({ navigation }: UpdateNavigation) {
  const route = useRoute<RouteProp<StackParamList>>();
  const { todo, dispatch } = useTodoContext();
  const [title, setTitle] = useState("");
  const date = new Date();
  const [dayCreated, setDayCreated] = useState();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const categories = ["Study", "Work", "Games", "Sports"];
  const [colors, setColors] = useState(NaN);
  const color = [
    "rgba(128, 188, 189, 1)",
    "rgba(170, 217, 187, 1)",
    "rgba(213, 240, 193, 1)",
    "rgba(249, 247, 201, 1)",
  ];
  const todoId = route.params?.item;
  const todoData = todo.filter((element: any) => element._id === todoId);
  const todoInitializeData = todoData[0];
  const initalState = [
    setTitle,
    setContent,
    setCategory,
    setDayCreated,
    setColors,
  ];
  const setInitialData = [
    todoInitializeData["title"],
    todoInitializeData["content"],
    todoInitializeData["category"],
    todoInitializeData["day"],
    todoInitializeData["color"],
  ];

  useEffect(() => {
    console.log(todoData);
    const fetchAndSet = () => {
      initalState.map((element, i) => {
        element(setInitialData[i]);
      });
    };
    fetchAndSet();
  }, []);
  //add data
  const AddTodo = async () => {
    const userTodo = { title, category, date, content, colors };

    try {
      const update = await axios.patch(
        `http://192.168.254.161:4000/data/todos/${todoId}`,
        {
          title: userTodo.title,
          category: userTodo.category,
          day: userTodo.date.toDateString(),
          content: userTodo.content,
          color: userTodo.colors,
          done: false,
        }
      );

      if (update.status === 200) {
        setTitle("");
        setContent("");
        setCategory("");
        setColors(NaN);
        console.log(update.data);
        dispatch({
          type: "UPDATE_TODO",
          payload: {
            _id: todoId,
            title: userTodo.title,
            category: userTodo.category,
            day: userTodo.date.toDateString(),
            content: userTodo.content,
            color: userTodo.colors,
            done: false,
          },
        });
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
            <Text className="mt-2  text-gray-400 font-bold">
              Created: {dayCreated}
            </Text>
            <Text className="mt-2  text-gray-400 font-bold">
              {date.toDateString()}
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
            value={content}
            multiline={true}
            onChangeText={setContent}
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
          style={{ backgroundColor: color[3] }}
          className="h-10 w-32 items-center justify-center rounded-md"
          onPress={() => AddTodo()}
        >
          <Text>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
