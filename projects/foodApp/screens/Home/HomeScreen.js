import React from "react";
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  View,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  FeatureRow,
  Header,
  HorizontalView,
  VerticalView,
} from "../../components";
import { db } from "../../../../firebase";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const HomeScreen = () => {
  const [featured, setFeatured] = React.useState([]);
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();

  // Fetch data from firebase firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      await db
        .collection("restaurant")
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          let featured = data.filter((item) => item.featured);
          featured = data.filter((item) => item.currentStatus === "open");
          setFeatured(featured);
          setRestaurants(data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message, [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => navigation.navigate("Onboarding"),
        },
        {
          text: "Retry",
          onPress: () => fetchData(),
        },
      ]);
    }
  };

  // Refresh data
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Header />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
        <StatusBar style="dark" translucent={false} backgroundColor={"#fff"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FeatureRow
          label={"top related"}
          render={<HorizontalView data={featured} />}
        />
        <FeatureRow
          label={"new on bolt food"}
          render={<HorizontalView data={restaurants} />}
        />
        <FeatureRow
          label={"all restaurant on foodIn"}
          render={<VerticalView data={restaurants} />}
          disabled
        />
      </ScrollView>
      <StatusBar style="dark" translucent={false} backgroundColor={"#fff"} />
    </SafeAreaView>
  );
};

export default HomeScreen;
