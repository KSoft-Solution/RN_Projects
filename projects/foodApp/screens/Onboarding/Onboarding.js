import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 w-full bg-[#189242] items-center p-6">
      <View className="mt-20">
        {/* <Image
          source={require("../../assets/onboarding.png")}
          className="h-48 20 w-48 object-cover"
        /> */}
      </View>
      <View className="justify-center items-center my-10">
        <Text className="text-xl capitalize w-40 text-center leading-7 font-bold tracking-widest text-white mb-2">
          fast delivery at your doorstep
        </Text>
        <Text className="text-sm capitalize text-center leading-7 tracking-wider  text-gray-200">
          Home delivery and online reservation system for restaurants & cafe
        </Text>
      </View>
      <View className="absolute bottom-10 w-full">
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          activeOpacity={0.9}
          className="bg-white w-full py-3 rounded-md shadow-lg mt-6"
        >
          <Text className="text-center text-[#189242] text-base font-bold tracking-wider">
            Let's explore
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;
