import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const VerticalView = ({ data }) => {
  return (
    <View className="mx-2">
      {data?.map((item, index) => (
        <CardItem item={item} key={index} />
      ))}
    </View>
  );
};

const CardItem = ({ item }) => {
  const navigation = useNavigation();

  if (item.currentStatus !== "open") {
    return (
      <TouchableOpacity
        activeOpacity={1}
        className="w-full mb-2"
        onPress={() =>
          navigation.navigate("RestaurantDetail", {
            item: item,
          })
        }
      >
        <ImageBackground
          imageStyle={{ borderRadius: 10 }}
          source={{ uri: item?.thumbnail }}
          className="h-32 w-full relative "
        >
          <LinearGradient
            className="absolute inset-0 items-center justify-center"
            colors={["rgba(0,0,0,0.8)", "rgba(0,0,0,0.8)"]}
          >
            <Text className="text-lg tracking-wider text-center text-white font-bold">
              Currently not accepting orders
            </Text>
          </LinearGradient>
        </ImageBackground>
        <View className="my-1">
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-base capitalize flex-1">
              {item?.name}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star-sharp" size={15} color={"black"} />
              <Text className="font-bold text-sm">{item?.rating}</Text>
            </View>
          </View>
          <Text className="text-base">GHC {item?.deliveryFee}.00</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      className="w-full mb-2"
      onPress={() =>
        navigation.navigate("RestaurantDetail", {
          item: item,
        })
      }
    >
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        source={{ uri: item?.thumbnail }}
        className="h-32 w-full relative"
      >
        {item?.discount && (
          <View className="absolute top-2 left-2">
            <View className="bg-white ite py-1 px-2 items-center justify-center rounded-full shadow-sm">
              <Text className="text-sm tracking-widest font-semibold text-red-500">
                {`${item?.discountPercent}%`}
              </Text>
            </View>
          </View>
        )}
        <View className="absolute bottom-2 right-2">
          <View className="bg-white py-2 px-4 items-center justify-center rounded-full shadow-sm">
            <Text className="text-sm tracking-widest font-semibold">
              {`${item?.deliveryTime}mins`}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View className="my-1">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-base capitalize flex-1">
            {item?.name}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="star-sharp" size={15} color={"black"} />
            <Text className="font-bold text-sm">{item?.rating}</Text>
          </View>
        </View>
        <Text className="text-base">GHC {item?.deliveryFee}.00</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalView;
