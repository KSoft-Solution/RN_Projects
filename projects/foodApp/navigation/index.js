import React from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  OrderScreen,
  SearchScreen,
  ProfileScreen,
} from "../screens";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "restaurant") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Order") {
            iconName = focused ? "receipt" : "receipt-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "md-person" : "md-person-outline";
          }
          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#1f2937",
        tabBarInactiveTintColor: "#d1d5db",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "transparent",
          height: 60,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          borderTopWidth: 1,
          borderTopColor: "#e9ecef",
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="restaurant" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
