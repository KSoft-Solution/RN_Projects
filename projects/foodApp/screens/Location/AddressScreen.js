import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { API_KEY } from "@env";

const AddressScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <View className="mx-4 py-3">
        <GooglePlacesAutocomplete
          query={{
            key: API_KEY,
            language: "en",
          }}
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          styles={{
            container: {
              width: "100%",
              flex: 0,
            },
            textInput: {
              fontSize: 16,
              backgroundColor: "#f3f4f6",
            },
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          placeholder="Enter a new address"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          minLength={2}
        />
      </View>
      <CardItem
        title="current location"
        desc="Failed to get current location"
        icon={"arrow-redo"}
      />
      <CardItem
        title="honey bee school complex"
        desc="Mile 11, Ghana"
        icon={"location-outline"}
        selected
      />
      <CardItem title="Mile 11" icon={"location-outline"} />
      <CardItem
        title="Cape cost"
        desc="Mile 11, Ghana"
        icon={"location-outline"}
      />
      <StatusBar style="dark" translucent={false} backgroundColor={"#fff"} />
    </SafeAreaView>
  );
};

const CardItem = ({ title, desc, icon, onPress, selected }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.3}
      className="flex-row justify-between items-center h-14 px-4 my-1 border-b border-gray-100"
    >
      <Ionicons name={icon} size={20} color={"#000"} />
      <View className="flex-1 mx-2">
        <Text className="text-base capitalize">{title}</Text>
        {desc && (
          <Text className="text-sm text-gray-500">current location</Text>
        )}
      </View>
      {selected && (
        <View className="w-7 h-7 bg-green-400 items-center justify-center rounded-full">
          <Ionicons name="checkmark-sharp" size={17} color={"#fff"} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-white flex-row items-center justify-between py-2 px-4">
      <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text className="capitalize font-bold text-lg">set delivery address</Text>
      <View />
    </View>
  );
};

export default AddressScreen;
