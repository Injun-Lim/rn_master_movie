import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "./../screens/Detail";
import { DARKGREY_COLOR } from "./../color";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  // const isDark = useColorScheme() === "dark";
  /* 테스트용으로 전부 darkTheme, 후에 위 주석 해제 필요 */
  const isDark = true;

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? DARKGREY_COLOR : "white",
        },
        headerTitleStyle: { color: isDark ? "white" : DARKGREY_COLOR },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
