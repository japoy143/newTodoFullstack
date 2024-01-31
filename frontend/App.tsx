import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import HomeRoute from "./routes/homeroute";
import { TodoContextProvider } from "./context/todoContext";
import StackRoute from "./routes/stackRoute";
export default function App() {
  const [myFonts] = useFonts({
    poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    rubik: require("./assets/fonts/Rubik-Regular.ttf"),
  });

  if (!myFonts) {
    return (
      <View>
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    );
  }

  return (
    <TodoContextProvider>
      <StackRoute />
    </TodoContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
