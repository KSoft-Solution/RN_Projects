import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../../../firebase";
import { VerticalView } from "../../components";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const SearchScreen = () => {
  const [showSearchScreen, setShowSearchScreen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // pull categories from list of restaurants
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const restaurant = await db
        .collection("restaurant")
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          return data;
        });
      let categoriesArray = [];
      restaurant.forEach((item) => {
        const category = item.categories;
        categoriesArray.push(category);
      });
      // remove duplicate and return unique categories
      const uniqueCategories = [...new Set(categoriesArray.flat())];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message, [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Retry",
          onPress: () => fetchCategories(),
        },
      ]);
    }
  };

  const handleSearch = async () => {
    setSearching(true);
    try {
      const restaurant = await db
        .collection("restaurant")
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            let data = {
              id: doc.id,
              ...doc.data(),
            };
            return data;
          });
          return data;
        });
      let searchResult = restaurant.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.categories.includes(searchText)
        );
      });
      setSearching(false);
      setSearchResult(searchResult);
    } catch (error) {
      setSearching(false);
      alert(error.message);
    }
  };

  // Refresh data
  const onRefresh = React.useCallback(() => {
    fetchCategories();
    wait(2000);
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-4 pt-2 bg-white">
          <Text className="text-xl font-bold capitalize tracking-wider text-black">
            search
          </Text>
        </View>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
        <StatusBar style="dark" translucent={false} backgroundColor={"#fff"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {showSearchScreen ? (
        <RenderSearchScreen
          searching={searching}
          handleSearch={handleSearch}
          setShowSearchScreen={setShowSearchScreen}
          searchText={searchText}
          setSearchText={setSearchText}
          searchResult={searchResult}
        />
      ) : (
        <InitialScreen
          handleSearch={handleSearch}
          setShowSearchScreen={setShowSearchScreen}
          searchText={searchText}
          setSearchText={setSearchText}
          categories={categories}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
      <StatusBar style="dark" translucent={false} backgroundColor={"#fff"} />
    </SafeAreaView>
  );
};

const RenderSearchScreen = ({
  setShowSearchScreen,
  setSearchText,
  searchText,
  handleSearch,
  searching,
  searchResult,
}) => {
  return (
    <View className="flex-1">
      <View
        style={{
          elevation: 5,
        }}
        className="px-4 pt-2 bg-white shadow-black flex-row items-center"
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setShowSearchScreen(false)}
        >
          <Ionicons name="arrow-back" size={20} color="#4b5563" />
        </TouchableOpacity>
        <TextInput
          className="mx-1 flex-1 px-4 py-3 text-base"
          placeholder="Restaurants, food, or cuisine"
          autoFocus
          onChangeText={(text) => {
            setSearchText(text);
            handleSearch();
          }}
          returnKeyType="search"
          value={searchText}
        />
      </View>
      <ScrollView className="flex-1 py-5 mx-4">
        {searching ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <VerticalView data={searchResult} />
        )}
      </ScrollView>
    </View>
  );
};

const InitialScreen = ({
  setShowSearchScreen,
  setSearchText,
  categories,
  refreshing,
  onRefresh,
  handleSearch,
}) => {
  return (
    <View className="flex-1 bg-white">
      <Header setShowSearchScreen={setShowSearchScreen} />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={categories}
        ListHeaderComponent={
          <View className="px-4 py-2">
            <Text className="text-lg font-bold capitalize tracking-widest text-black">
              popular categories
            </Text>
          </View>
        }
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <CategoryItem
            handleSearch={handleSearch}
            item={item}
            setSearchText={setSearchText}
            setShowSearchScreen={setShowSearchScreen}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const CategoryItem = ({
  item,
  setShowSearchScreen,
  setSearchText,
  handleSearch,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setSearchText(item);
        handleSearch();
        setShowSearchScreen(true);
      }}
      activeOpacity={0.9}
      className="px-4  my-1 py-3 flex-row items-center"
    >
      <Text className="text-base capitalize text-black">{item}</Text>
    </TouchableOpacity>
  );
};

const Header = ({ setShowSearchScreen }) => {
  return (
    <View className="px-4 pt-2 bg-white">
      <Text className="text-xl font-bold capitalize tracking-wider text-black">
        search
      </Text>
      <View className="flex-row items-center mt-4 px-2 bg-[#f3f4f6] rounded-md">
        <Ionicons name="search" size={20} color="#ccc" />
        <TextInput
          className="flex-1 px-4 py-3 text-base"
          placeholder="Restaurants, food, or cuisine"
          onPressIn={() => setShowSearchScreen(true)}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
