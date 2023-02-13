import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const FeaturedRow = ({ label, disabled, render }) => {
  return (
    <View className="my-2">
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        className="flex-row items-center justify-between mx-4"
      >
        <Text className="capitalize text-lg font-bold tracking-wider">
          {label}
        </Text>
        {!disabled && (
          <View className="px-3 rounded-lg py-2 bg-green-200">
            <Text className="text-sm capitalize font-bold tracking-wide text-gray-900">
              all
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <View className="pt-2">{render}</View>
    </View>
  );
};

export default FeaturedRow;
