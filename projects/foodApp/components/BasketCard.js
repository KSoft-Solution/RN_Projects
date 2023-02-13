import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectBasketTotal } from "../redux/slices/BasketSlice";

const BasketCard = () => {
  const total = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  return (
    <View className="bg-white py-3 px-4">
      <TouchableOpacity
        onPress={() => navigation.navigate("BasketScreen")}
        activeOpacity={0.9}
        className="h-14 rounded-full w-full items-center justify-center bg-green-600"
      >
        <Text className="text-lg font-bold text-white tracking-wider">
          View Basket GH₵ {total.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketCard;
