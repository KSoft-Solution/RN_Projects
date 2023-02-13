import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-white w-full py-3 px-4 flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => navigation.navigate("SetAddress")}
        activeOpacity={0.9}
        className="flex-1 flex-row items-center"
      >
        <Ionicons name="location-outline" size={18} color="#f87171" />
        <Text className="capitalize text-sm px-1 font-bold">
          Current location
        </Text>
        <Ionicons name="chevron-down" size={18} color="#f87171" />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        <Ionicons name="cart-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
