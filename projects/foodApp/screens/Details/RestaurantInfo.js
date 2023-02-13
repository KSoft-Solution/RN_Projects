import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ImageBackground,
  Linking,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

const DUMMY_DATA = [
  {
    day: "monday",
    start: "10:00",
    close: "23:00",
  },
  {
    day: "tuesday",
    start: "10:00",
    close: "23:00",
  },
  {
    day: "wednesday",
    start: "10:00",
    close: "23:00",
  },
  {
    day: "thursday",
    start: "10:00",
    close: "23:00",
  },
  {
    day: "friday",
    start: "10:00",
    close: "23:00",
  },
];

const RestaurantInfo = ({ route }) => {
  const info = route.params.info;
  const navigation = useNavigation();

  const handleCall = () => {
    Linking.openURL(`tel:${info.phone}`);
  };

  const handleMaps = () => {
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${info.location.latitude},${info.location.longitude}`
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-2">
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={"#000"} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Header info={info} />
        <View className="px-4 py-4">
          <Text className="text-lg font-bold tracking-wider">{info.name}</Text>
          <Text className="text-base text-gray-600 tracking-wider">
            {info.address}
          </Text>
          <TouchableOpacity
            onPress={() => handleMaps()}
            activeOpacity={0.8}
            className="my-2 py-3 h-12 items-center justify-center bg-white border border-gray-400 rounded-full"
          >
            <Text className="text-base tracking-wider font-semibold">
              View map
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCall()}
            activeOpacity={0.8}
            className="mb-3 py-3 h-12 items-center justify-center bg-white border  border-gray-400 rounded-full"
          >
            <Text className="text-base tracking-wider font-semibold">Call</Text>
          </TouchableOpacity>
          <Text className="text-lg font-bold tracking-wider">Allerges?</Text>
          <Text className="text-base text-gray-600 tracking-wider">
            Ask the restaurant about their ingredients and cooking methods
          </Text>
          <Text className="mt-3 text-lg font-bold tracking-wider">
            Open for delivery orders
          </Text>
          <View className="">
            {DUMMY_DATA.map((item, index) => (
              <View className="flex-row items-center py-1 mx-1" key={index}>
                <Text className="w-36 mr-2 text-base text-gray-600 capitalize">
                  {item.day}
                </Text>
                <View className="flex-row items-center">
                  <Text className="mr-2 text-base text-gray-600 capitalize">
                    {item.start}
                  </Text>
                  <Text className="mr-2 text-base text-gray-600 capitalize">
                    -
                  </Text>
                  <Text className="mr-2 text-base text-gray-600 capitalize">
                    {item.close}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <StatusBar
        barStyle={"dark-content"}
        translucent={false}
        backgroundColor={"#fff"}
      />
    </SafeAreaView>
  );
};

const Header = ({ info }) => {
  let latitude = parseInt(info.location.latitude);
  let longitude = parseInt(info.location.longitude);
  return (
    <View>
      <MapView
        className="h-52 w-full"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType={"mutedStandard"}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={info.name}
          description={info.address}
          identifier="origin"
          pinColor="#000"
        />
      </MapView>
    </View>
  );
};

export default RestaurantInfo;
