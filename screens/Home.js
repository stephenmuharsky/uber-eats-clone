import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs";
import RestaurantItems, {
  localRestaurants,
} from "../components/home/RestaurantItems";
import SearchBar from "../components/home/SearchBar";

const YELP_API_KEY =
  "GOgQBsF7vfn73VQJCDJH9cYdmVpHjqn7bKci1m2pvS6GfRptLQPMabgYH8LhYPYeoVVQ0M9LGScGvCkd-JxXtcW2_vcmEWZpcfRjnb2MURWaNHnFK3gfWuZXOIIKYnYx";

export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("Toronto");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
    const corsUrl = `https://cors-anywhere.herokuapp.com/${yelpUrl}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(corsUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.businesses);
        setRestaurantData(json.businesses);
      })
      .catch((e) => console.log(e));

    //=> setRestaurantData(json.businesses))
    //.then(console.log("FETCH ATTEMPT"))
    //.catch((e) => console.log(e));

    //=>
    //business.transactions.includes(activeTab.toLowerCase())
    /**
     *    The filter by pickup/ delivery feature does not work outside of USA so I removed it.
     */
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  useEffect(() => {
    console.log("Restaurant Data Updated", restaurantData);
  }, [restaurantData]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
}
