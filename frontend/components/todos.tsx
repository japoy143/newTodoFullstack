import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { useTodoContext } from "../hooks/useTodoContext";
import { TrashIcon, PencilSquareIcon } from "react-native-heroicons/outline";

type Category = {
  category: {
    title: string;
  };
  navigation: any;
};

const color = [
  "rgba(128, 188, 189, 1)",
  "rgba(170, 217, 187, 1)",
  "rgba(213, 240, 193, 1)",
  "rgba(249, 247, 201, 1)",
];

export default function Todos({ category, navigation }: Category) {
  const { todo, dispatch } = useTodoContext();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://192.168.254.161:4000/data/todos");
      if (res.status === 200) {
        dispatch({ type: "SET_TODO", payload: res.data });
        console.log(res.data);
      }
    };
    fetch();
  }, []);

  //delete Data
  const deleteTodo = async (id: any) => {
    try {
      const todo = await axios.delete(
        `http://192.168.254.161:4000/data/todos/${id}`
      );

      if (todo.status === 200) {
        dispatch({ type: "DELETE_TODO", payload: todo.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className=" ">
      <FlatList
        data={todo}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (category.title === "" || category.title.toLowerCase() === "all") {
            return (
              <View
                className={`w-40  h-52 p-10  m-2  rounded-xl flex-row`}
                style={{ backgroundColor: color[item.color] }}
              >
                <View>
                  <Text>{item.title}</Text>
                  <Text>{item.content}</Text>
                  <Text>{item.day}</Text>
                  <Text>{item.category}</Text>
                  <Text>{item.color}</Text>
                </View>
                <View className="justify-between">
                  <TouchableOpacity onPress={() => deleteTodo(item._id)}>
                    <TrashIcon size={24} color={"black"} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation(item._id)}>
                    <PencilSquareIcon size={24} color={"black"} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
          if (
            item.category.toLowerCase().includes(category.title.toLowerCase())
          ) {
            return (
              <View
                className={`w-40  h-52 p-10  m-2 rounded-xl `}
                style={{ backgroundColor: color[item.color] }}
              >
                <Text>{item.title}</Text>
                <Text>{item.content}</Text>
                <Text>{item.day}</Text>
                <Text>{item.category}</Text>
                <Text>{item.color}</Text>
              </View>
            );
          } else {
            return <View></View>;
          }
        }}
      />
    </View>
  );
}
