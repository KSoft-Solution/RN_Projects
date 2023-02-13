import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../redux/slices/BasketSlice";
import { truncate } from "../utils";

const BasketItem = ({ items, index }) => {
  const dispatch = useDispatch();
  return (
    <View className="flex-row justify-between py-3 border-b border-gray-200">
      <Text className="text-base text-gray-700 tracking-wider">{`${
        items.length
      } x ${truncate(items[0]?.name, 25)}`}</Text>
      <View className="items-center">
        <Text className="text-base text-gray-700 tracking-wider mx-3">{`GH₵ ${truncate(
          (items[0].price * items.length).toFixed(2),
          40
        )}`}</Text>
        <TouchableOpacity
          onPress={() => dispatch(removeFromBasket({ id: index }))}
        >
          <Text className="text-sm text-green-600 font-bold tracking-wider">
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//
export default BasketItem;
