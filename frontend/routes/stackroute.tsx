import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeRoute from "./homeroute";
import UpdatePage from "../screens/updatePage";

export type StackParamList = {
  HomeRoute: undefined;
  Update: { ItemId?: any };
};
const Stack = createNativeStackNavigator<StackParamList>();
export default function StackRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeRoute"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeRoute" component={HomeRoute} />
        <Stack.Screen name="Update" component={UpdatePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
