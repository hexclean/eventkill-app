import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import axios from "axios";

// Components
import Screen from "../../components/Screen";
import DeletedCards from "../../components/DeletedCards";
import authStorage from "../../auth/storage";
import Loading from "../../components/ActivityIndicator";

export default function DeletedMeetsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meets, setMeets] = useState([]);

  const getDeletedMeets = async () => {
    const authToken = await authStorage.getToken();

    let data = {
      headers: {
        "x-auth-token": authToken,
        "content-type": "application/json",
      },
    };
    setLoading(true);
    await axios
      .get("https://api.eventkill.com/api/meets/deleted", data)
      .then((response) => {
        setMeets(response.data.result);
      });
    setLoading(false);
  };

  useEffect(() => {
    getDeletedMeets();
  }, []);

  const [loaded] = useFonts({
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Screen>
      {loading && (
        <>
          <Loading visible={true} />
        </>
      )}

      {meets.length === 0 && (
        <View style={styles.noMeetView}>
          <Text style={styles.noMeetTitle}>Nincs lemondott meeting</Text>
        </View>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={meets}
        extraData={meets}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => <DeletedCards item={item} />}
        refreshing={refreshing}
        onRefresh={async () => {
          await getDeletedMeets();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  noMeetView: {
    marginVertical: 10,
    alignItems: "center",
  },
  noMeetTitle: {
    fontFamily: "PoppinsBold",
    paddingTop: 7,
    fontSize: 16,
  },
});
