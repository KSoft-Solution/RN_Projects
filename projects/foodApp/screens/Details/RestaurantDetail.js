import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, {
  useState,
  useEffect,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  TriggeringView,
  ImageHeaderScrollView,
} from "react-native-image-header-scroll-view";
import { useSelector,useDispatch } from "react-redux";
import { selectBasketItems, clearBasket } from "../../redux/slices/BasketSlice";
import { setRestaurant } from "../../redux/slices/RestaurantSlice";
import { ErrorCard, Headline, MenuItem, BasketCard } from "../../components";

const RestaurantDetail = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const item = route.params.item;
  const basketItems = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigateBack = () => {
    dispatch(clearBasket());
    navigation.goBack();
  };

  let restaurantItem = {
    id: item.id,
    name: item.name,
    description: item.description,
    image: item.thumbnail,
    rating: item.rating,
    deliveryFee: item.deliveryFee,
    discountPercent: item.discountPercent,
    deliveryTime: item.deliveryTime,
    discount: item.discount,
    latitude: item.location.latitude,
    longitude: item.location.longitude,
    menu: item.menu,
  };

  // Fake loading
  useEffect(() => {
    dispatch(setRestaurant(restaurantItem));

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [dispatch]);

  return (
    <>
      <View className="flex-1">
        <ImageHeaderScrollView
          maxHeight={200}
          minHeight={90}
          maxOverlayOpacity={0.7}
          minOverlayOpacity={0.6}
          renderHeader={() => <Header thumbnail={item?.thumbnail} />}
          renderFixedForeground={() => (
            <RenderForeground navigateBack={navigateBack} />
          )}
        >
          <View className="">
            <TriggeringView>
              <View className="">
                <Headline item={item} />
                {isLoading ? (
                  <View className="items-center justify-center">
                    <ActivityIndicator size={"large"} color={"#000"} />
                  </View>
                ) : (
                  <View className="px-4 py-4">
                    <Text className="text-bol text-xl font-bold tracking-wider">
                      Most popular
                    </Text>
                    {item?.menu.map((menuItem, index) => (
                      <MenuItem
                        key={index}
                        menuItem={menuItem}
                        percentage={item?.discountPercent}
                        discount={item?.discount}
                        currentStatus={
                          item?.currentStatus !== "open" ? true : false
                        }
                        id={menuItem?.id}
                      />
                    ))}
                  </View>
                )}
              </View>
            </TriggeringView>
          </View>
        </ImageHeaderScrollView>
        {basketItems.length !== 0 && item.currentStatus === "open" && (
          <BasketCard />
        )}
        {item.currentStatus !== "open" && <ErrorCard />}
      </View>
      <StatusBar
        barStyle={"light-content"}
        translucent={true}
        backgroundColor="transparent"
      />
    </>
  );
};

const RenderForeground = ({ navigateBack }) => {
  return (
    <View
      style={{
        paddingTop: StatusBar.currentHeight + 10,
      }}
      className="flex-row items-center justify-center mx-4 "
    >
      <TouchableOpacity activeOpacity={0.8} onPress={navigateBack}>
        <Ionicons name="arrow-back" size={25} color="#fff" />
      </TouchableOpacity>
      <View className="flex-1"></View>
    </View>
  );
};

const Header = ({ thumbnail }) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={{ uri: thumbnail }}
      className="w-full h-full"
    >
      <SafeAreaView className="px-5"></SafeAreaView>
    </ImageBackground>
  );
};

export default RestaurantDetail;
