import React from "react";
import { Text, Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movie";
import TV from "../screens/TV";
import Search from "../screens/Search";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import {
  DARKGREY_COLOR,
  LIGHTGREY_COLOR,
  MIDGREY_COLOR,
  YELLOW_COLOR,
} from "../color";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  // const isDark = useColorScheme() === "dark";
  /* 테스트용으로 전부 darkTheme, 후에 위 주석 해제 필요 */
  const isDark = true;

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? DARKGREY_COLOR : "white",
      }}
      initialRouteName="Movies"
      screenOptions={{
        unmountOnBlur: true, //다른 tab으로 이동시 메모리에서 해당 화면 삭제
        tabBarStyle: { backgroundColor: isDark ? DARKGREY_COLOR : "white" },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : DARKGREY_COLOR,
        tabBarInactiveTintColor: isDark ? LIGHTGREY_COLOR : MIDGREY_COLOR,
        headerStyle: { backgroundColor: isDark ? DARKGREY_COLOR : "white" },
        headerTitleStyle: { color: isDark ? "white" : DARKGREY_COLOR },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "700" },

        // headerRight: () => (
        //   <View>
        //     <Text>HeaderRight</Text>
        //   </View>
        // ),
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="film-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={TV}
        options={{
          tabBarBadge: "5s",
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="tv-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons name={"search-outline"} size={size} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
