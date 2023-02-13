import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tabs = () => {
  return (
    <View className="flex-row items-center w-full justify-between bg-gray-100 my-3 px-1  rounded-full">
      <TouchableOpacity
        activeOpacity={0.5}
        className="bg-white py-3 w-44 rounded-full items-center justify-center"
      >
        <Text className="text-base text-green-600 tracking-wider font-bold">
          Delivery
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        className="py-3 px-5 items-center justify-center"
      >
        <Text className="text-base text-gray-500 tracking-wider font-bold">
          Delivery
        </Text>
        <Text className="text-sm text-gray-500 tracking-wider">
          Not available
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Tabs;
