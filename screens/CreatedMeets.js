import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, FlatList, Image } from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import colors from "../config/colors";
import { useIsFocused } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
// Components
import Screen from "../components/Screen";
import CreatedCart from "../components/CreatedCart";
import Loading from "../components/ActivityIndicator";
import authStorage from "../auth/storage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function CreatedScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [meets, setMeets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [loaded] = useFonts({
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const getTodayMeets = async () => {
    const authToken = await authStorage.getToken();

    let data = {
      headers: {
        "x-auth-token": authToken,
        "content-type": "application/json",
      },
    };
    setLoading(true);
    await axios
      .get("https://api.eventkill.com/api/meets/sent", data)
      .then((response) => {
        setMeets(response.data.result);
      });
    setLoading(false);
  };

  const getCheckMeetStatus = async (meetId) => {
    const authToken = await authStorage.getToken();
    let data = {
      headers: {
        "x-auth-token": authToken,
        "content-type": "application/json",
      },
    };
    //
    return axios.get(
      `https://api.eventkill.com/api/meets/check/${meetId}`,
      data
    );

    //
  };

  const postDeleteMeet = async (meetId) => {
    const authToken = await authStorage.getToken();
    let data = {
      headers: {
        "x-auth-token": authToken,
        "content-type": "application/json",
      },
    };
    try {
      await axios.post(
        `https://api.eventkill.com/api/operation/delete/${meetId}`,
        {},
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodayMeets();
  }, [isFocused]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      {loading && (
        <>
          <Loading visible={true} />
        </>
      )}
      <Screen>
        <View style={styles.welcome}>
          {/* <View style={styles.testtt}>
						<MaterialIcons name="notifications" size={26} color="black" />
					</View> */}
        </View>
        {meets.length === 0 ? (
          <View>
            <View style={styles.title}>
              <Text style={styles.start}>
                Még nem hoztál létre megbeszélést!
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("NewMeet")}
            >
              <View style={styles.createMeet}>
                <Text style={styles.createMeetText}>
                  Megbeszélés létrehozása!
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ) : (
          <View style={styles.title}>
            <Text style={styles.start}>Létrehozott megbeszélések</Text>
          </View>
        )}

        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={meets}
          extraData={meets}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => <CreatedCart item={item} />}
          refreshing={refreshing}
          onRefresh={async () => {
            await getTodayMeets();
          }}
        />
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  createMeetText: {
    color: colors.white,
    fontFamily: "PoppinsBold",

    fontSize: 16,
  },
  createMeet: {
    backgroundColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 18,
    padding: 9,
  },
  empty: {
    justifyContent: "center",
  },
  profileSection: { flexDirection: "row" },
  mainInfo: {
    justifyContent: "center",
  },
  testtt: { justifyContent: "center" },

  name: {
    paddingLeft: 12,
    fontFamily: "PoppinsBold",
    fontSize: 19,
  },
  profileImage: {
    height: 43,
    width: 43,
    borderRadius: 50,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  profile: {
    height: 30,
    width: 30,
  },
  title: {
    alignItems: "center",
    paddingTop: 15,
  },
  welcome: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    paddingTop: 20,
  },
  welcomeName: {
    fontSize: 17,
    // fontWeight: "400",
    fontFamily: "PoppinsRegular",
  },
  start: {
    fontFamily: "PoppinsBold",
    paddingTop: 7,
    fontSize: 16,
  },
});
