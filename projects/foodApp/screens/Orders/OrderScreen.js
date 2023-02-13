import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-4 py-2 bg-white">
        <Text className="text-xl font-bold capitalize tracking-wider text-black">
          my orders
        </Text>
      </View>
      <EmptyOrder/>
    </SafeAreaView>
  );
};

const EmptyOrder = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-center items-center">
      <View className="my-10">
        <Ionicons name="ios-fast-food-outline" size={100} color="#ccc" />
      </View>
      <Text className="text-lg font-semibold tracking-wider">
        You don't have any past orders yet
      </Text>
      <Text className="text-sm text-[#ccc]">Food you order will show here</Text>
      <View className="w-64">
        <TouchableOpacity
          onPress={() => navigation.navigate("restaurant")}
          activeOpacity={0.8}
          className="bg-green-500 w-full px-4 py-3 rounded-full mt-4 justify-center items-center shadow-sm"
        >
          <Text className="text-base font-bold text-white">Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default OrderScreen;
