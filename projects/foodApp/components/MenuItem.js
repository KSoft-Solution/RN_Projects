import { View, Text, TouchableOpacity, Image } from "react-native";
import React,{useState} from "react";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { calculateDiscountPrice, truncate } from "../utils";
import {
  addToBasket,
  selectBasketItemsById,
  removeFromBasket,
} from "../redux/slices/BasketSlice";

const MenuItem = ({ menuItem, percentage, discount, id, currentStatus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsById(state, id));

  const handleAddToBascket = () => {
    let basketItem = {
      id: id,
      name: menuItem.name,
      price: parseInt(
        calculateDiscountPrice(parseInt(menuItem.price), parseInt(percentage))
      ),
      thumbnail: menuItem.thumbnail,
    };
    dispatch(addToBasket(basketItem));
  };

  const handleRemoveFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <TouchableOpacity
      disabled={currentStatus}
      onPress={() => setIsOpen(!isOpen)}
      activeOpacity={0.9}
      className="py-3 my-1 border-t border-gray-300"
    >
      <View className="flex-row">
        <View className="flex-1">
          <Text className="text-base font-bold capitalize tracking-wider">
            {menuItem.name}
          </Text>
          <Text className="text-sm text-gray-600 tracking-wider">
            {truncate(menuItem.description, 60)}
          </Text>
          <View className="py-2 flex-row">
            {/* strike through text */}
            <Text
              className={`text-base text-gray-600 tracking-wider ${
                discount && "line-through"
              }`}
            >
              {`GH₵ ${parseInt(menuItem.price).toFixed(2)}`}
            </Text>
            {discount && (
              <View className="ml-2 bg-red-700 px-2 rounded-full">
                <Text className="text-base text-white tracking-wider">
                  {`GH₵ ${calculateDiscountPrice(
                    parseInt(menuItem.price),
                    parseInt(percentage)
                  )}`}
                </Text>
              </View>
            )}
          </View>
        </View>
        <Image
          source={{ uri: menuItem.thumbnail }}
          className="w-24 h-20 object-cover"
        />
      </View>
      {isOpen && (
        <View className=" mt-2 flex-row items-center">
          <TouchableOpacity
            disabled={items.length === 0}
            onPress={handleRemoveFromBasket}
            activeOpacity={0.9}
            className={`rounded-full h-8 w-10 items-center justify-center ${
              items.length === 0 ? "bg-gray-100" : "bg-green-200"
            }`}
          >
            <Entypo name="minus" size={20} color="#000" />
          </TouchableOpacity>
          <Text className="text-base text-black mx-3">{items.length}</Text>
          <TouchableOpacity
            onPress={handleAddToBascket}
            activeOpacity={0.9}
            className="bg-green-200 rounded-full h-8 w-10 items-center justify-center"
          >
            <Entypo name="plus" size={20} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default MenuItem;
