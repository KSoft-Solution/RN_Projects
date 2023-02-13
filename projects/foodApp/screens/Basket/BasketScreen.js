import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MapView, { Marker } from "react-native-maps";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { truncate } from "../../utils";
import { BasketItem, Tabs } from "../../components";
import { selectRestaurant } from "../../redux/slices/RestaurantSlice";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../../redux/slices/BasketSlice";

export default function BasketScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const basketItems = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [uniqueBaskerItems, setUniqueBasketItems] = useState([]);

  useEffect(() => {
    const uniqueItems = basketItems.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setUniqueBasketItems(uniqueItems);
  }, [basketItems]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        restaurant={restaurant.name}
        handleBackPress={() => handleBackPress()}
      />
      <ScrollView className="px-4 py-2" showsVerticalScrollIndicator={false}>
        <Tabs />
        <View className="my-2">
          {Object.entries(uniqueBaskerItems).map(([index, items]) => (
            <BasketItem items={items} index={index} key={index} />
          ))}
        </View>
        <SelectMore handleBackPress={() => handleBackPress()} />
        <TextInput
          className="my-3 py-2 border-b border-gray-200 w-full text-base text-gray-600"
          placeholder="Need cutlery? Napkins? Others? Leave a comment...."
          numberOfLines={2}
        />
        <View className="py-3 border-b border-gray-200 flex-row justify-between items-center">
          <Text className="text-base text-gray-700 tracking-wider">
            Delivery Fee
          </Text>
          <Text className="text-base text-gray-700 tracking-wider">
            GH₵ {parseInt(restaurant.deliveryFee).toFixed(2)}
          </Text>
        </View>
        <View className="py-3 border-b border-gray-200 flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="pricetag" size={20} color={"#b91c1c"} />
            <Text className="ml-2 text-base text-gray-700 tracking-wider">
              Delivery discount
            </Text>
          </View>
          <Text className="text-base text-gray-700 tracking-wider">
            GH₵ {parseInt(restaurant.discountPercent).toFixed(2)}
          </Text>
        </View>
        <View className="py-3 border-b border-gray-200 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-black tracking-wider">
            Total
          </Text>
          <Text className="text-xl font-bold text-black tracking-wider">
            GH₵ {parseInt(basketTotal).toFixed(2)}
          </Text>
        </View>
        <DeliveryDetails restaurant={restaurant} />
      </ScrollView>
      <StatusBar style="dark" translucent={false} backgroundColor={"#fff"} />
    </SafeAreaView>
  );
}

const DeliveryDetails = ({ restaurant }) => {
  const navigation = useNavigation();
  const [isChecked, setChecked] = React.useState(false);
  return (
    <View className="my-3 py-1">
      <Text className="text-xl font-bold text-black tracking-wider">
        Delivery details
      </Text>
      <View className="py-3 border-b border-gray-200 flex-row items-center">
        <Ionicons name="time-outline" size={20} color={"#000"} />
        <Text className="text-base ml-3 text-black">
          {restaurant.deliveryTime} mins
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("SetAddress")}
        activeOpacity={0.9}
        className="py-3 border-b border-gray-200 flex-row items-center"
      >
        <View className="flex-1 flex-row items-center">
          <Ionicons name="location-outline" size={20} color={"#000"} />
          <Text className="text-base ml-3 text-black">Current location</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={"#000"} />
      </TouchableOpacity>
      <MapView
        className="h-36 w-full my-3"
        initialRegion={{
          latitude: parseInt(restaurant.latitude),
          longitude: parseInt(restaurant.longitude),
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType={"standard"}
      >
        <Marker
          coordinate={{
            latitude: parseInt(restaurant.latitude),
            longitude: parseInt(restaurant.longitude),
          }}
          title={restaurant.name}
          description={restaurant.description}
          identifier="origin"
          pinColor="#000"
        />
      </MapView>
      <TouchableOpacity
        activeOpacity={1}
        className="py-3 border-b border-gray-200 flex-row items-center"
      >
        <View className="flex-1 flex-row items-center">
          <Ionicons name="cash" size={20} color={"#16a34a"} />
          <Text className="text-base ml-3 text-black">Cash</Text>
        </View>
        <Text className="text-base font-bold text-green-600">Change</Text>
      </TouchableOpacity>
      <View className="py-3 border-b border-gray-200 flex-row">
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#16a34a" : "#ccc"}
        />
        <View className="flex-1">
          <Text className="text-base ml-3 text-black leading-7">
            Cash order. I agree that the change can be transferred to my Bolt
            Balance or left as a tip for the courir.
          </Text>
          <Text className="text-base underline ml-3 text-black">
            How Bolt Balance works
          </Text>
        </View>
      </View>
      <View className="pt-5">
        <TouchableOpacity
          onPress={() => navigation.navigate("DeliveryScreen")}
          disabled={!isChecked}
          activeOpacity={0.8}
          className={`${
            isChecked ? "bg-green-600" : "bg-green-300"
          } h-16 items-center flex-row  rounded-full px-1`}
        >
          <View className="h-14 w-14 bg-white rounded-full items-center justify-center">
            <Ionicons name="arrow-forward-sharp" size={25} color="#16a34a" />
          </View>
          <View className="items-center justify-center ml-10">
            <Text className="text-xl font-bold text-white tracking-wider">
              Order GH₵46.00
            </Text>
            <Text className="text-sm font-bold text-white">Slide to order</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SelectMore = ({ handleBackPress }) => {
  return (
    <TouchableOpacity
      onPress={handleBackPress}
      activeOpacity={0.9}
      className="flex-row items-center border-b border-gray-200 py-3"
    >
      <Ionicons name="add-circle-sharp" size={20} color={"#16a34a"} />
      <Text className="text-green-600 text-base font-bold">Add more</Text>
    </TouchableOpacity>
  );
};

const Header = ({ handleBackPress, restaurant }) => {
  return (
    <View
      style={{ elevation: 5 }}
      className="flex-row items-center px-4 py-2 bg-white"
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleBackPress}
        className="mr-10"
      >
        <Ionicons name="arrow-back" size={25} color="#000" />
      </TouchableOpacity>
      <Text className="text-lg font-bold tracking-widest">
        {truncate(restaurant, 25)}
      </Text>
    </View>
  );
};
