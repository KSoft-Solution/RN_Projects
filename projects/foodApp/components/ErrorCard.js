import { View, Text } from "react-native";
import React from "react";

const ErrorCard = () => {
  return (
    <View className="mx-2">
      <View className="absolute bottom-5 h-12 items-center justify-center rounded-lg shadow-md bg-opacity-60 bg-gray-800 w-full">
        <Text className="text-sm text-white tracking-wider font-bold">
          Currently not accepting orders now
        </Text>
      </View>
    </View>
  );
};
export default ErrorCard;
