import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HorizontalView = ({ data }) => {
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <CardItem item={item} />}
      />
    </View>
  );
};

const CardItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={1}
      className="w-64 mx-2"
      onPress={() =>
        navigation.navigate("RestaurantDetail", {
          item: item
        })
      }
    >
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        source={{ uri: item?.thumbnail }}
        className="h-32 w-full relative rounded-lg object-cover"
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

export default HorizontalView;
