import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, FlatList, Image } from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import colors from "../config/colors";
import { useIsFocused } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
// Components
import Screen from "../components/Screen";
import Card from "../components/Card";
import Loading from "../components/ActivityIndicator";
import authStorage from "../auth/storage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
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
      .get("https://api.eventkill.com/api/meets/today", data)
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

  const deleteMeet = (meet) => {
    setLoading(true);
    getCheckMeetStatus(meet.id)
      .then((response) => {
        setLoading(false);
        Alert.alert(
          "Meeting lemondása",
          "Leszeretnéd mondani a meetinget?",
          [
            {
              text: "Mégse",
              style: "cancel",
            },
            {
              text: "Igen",
              onPress: async () => {
                await postDeleteMeet(meet.id);
                await getTodayMeets();
                if (response.data.result[0].status === 1) {
                  Alert.alert(
                    "Deal!",
                    "Mindketten lemondtátok a megbeszélést, így elmarad!",
                    [
                      {
                        text: "Rendben",
                        style: "cancel",
                      },
                    ]
                  );
                }
              },
            },
          ],
          { cancelable: false }
        );
      })
      .catch((err) => {
        setLoading(false);
      });
  };

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
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Profile")}
          >
            <Entypo name="menu" size={30} color="black" />
          </TouchableWithoutFeedback>

          {/* <View style={styles.testtt}>
						<MaterialIcons name="notifications" size={26} color="black" />
					</View> */}
        </View>
        {meets.length === 0 ? (
          <View>
            <View style={styles.title}>
              <Text style={styles.start}>Mára nincs megbeszélésed!</Text>
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
            <Text style={styles.start}>Mára tervezett megbeszéléseid</Text>
          </View>
        )}

        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={meets}
          extraData={meets}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card item={item} deleteMeet={() => deleteMeet(item)} />
          )}
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
