import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const Headline = ({ item }) => {
    const navigation = useNavigation();
    return (
      <View className="py-2 px-4 ">
        <View className="flex-row justify-between">
          <View className="flex-1">
            <Text className="text-2xl capitalize font-bold tracking-wider">
              {item?.name}
            </Text>
            <Text className="text-base text-gray-600 capitalize tracking-wider">{`delivery GH₵ ${item?.deliveryFee}.00`}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="star-sharp" size={15} color={"black"} />
            <Text className="font-bold text-xl">{item?.rating}</Text>
          </View>
        </View>
        {item?.discount && (
          <View className=" flex-row items-center py-3 border-b border-gray-300">
            <Ionicons name="pricetag" size={20} color={"#dc2626"} />
            <Text className="text-base text-gray-600 mx-3">
              {`${item?.discountPercent}% off on the entire menu `}
            </Text>
          </View>
        )}
        <View className="py-3 border-b border-gray-300">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("RestaurantInfo", { info: item })}
            className="items-center flex-row justify-between"
          >
            <View className="flex-row items-center">
              <Ionicons name="warning-outline" size={15} color={"#4b5563"} />
              <Text className="text-base text-gray-600 mx-3">
                Allerges and contact details
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={15}
              color={"#4b5563"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
export default Headline