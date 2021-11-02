import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useIsFocused } from "@react-navigation/core";
import { LocaleConfig } from "react-native-calendars";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import Screen from "../../components/Screen";
import Loading from "../../components/ActivityIndicator";
import authStorage from "../../auth/storage";
import colors from "../../config/colors";

const date = new Date();
const MeetsByCalendarScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [meets, setMeets] = useState([]);

  LocaleConfig.locales["hu"] = {
    monthNames: [
      "Január",
      "Február",
      "Március",
      "Április",
      "Május",
      "Június",
      "Július",
      "Augusztus",
      "Szeptember",
      "Október",
      "November",
      "December",
    ],
    monthNamesShort: [
      "jan.",
      "febr.",
      "márc.",
      "ápr.",
      "máj.",
      "jún.",
      "júl..",
      "aug",
      "szept.",
      "okt.",
      "nov.",
      "dec.",
    ],
    dayNames: ["Hé", "Ke", "Sze", "Csüt", "Pé", "Szo", "Va"],
    dayNamesShort: ["Hé", "Ke", "Sze", "Csüt", "Pé", "Szo", "Va"],
    // dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Ma",
  };
  LocaleConfig.defaultLocale = "hu";

  const getCalendarMeets = async () => {
    const authToken = await authStorage.getToken();
    let data = {
      headers: {
        "x-auth-token": authToken,
        "content-type": "application/json",
      },
    };
    setLoading(true);
    await axios
      .get("https://api.eventkill.com/api/meets/calendar", data)
      .then((response) => {
        setMeets(response.data.result);
      });
    setLoading(false);
  };

  useEffect(() => {
    getCalendarMeets();
  }, [isFocused]);

  const [loaded] = useFonts({
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
    PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }

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
                await getCalendarMeets();
                if (response.data.result[0].status === 1) {
                  Alert.alert(
                    "Lemondott Meeting",
                    "A partnered is lemondta a meetinget, így elmarad!",
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

  return (
    <Screen>
      {loading && (
        <>
          <Loading visible={true} />
        </>
      )}
      {/* {getCalendarMeetsApi.error && (
				<>
					<Text>Couldn't retrieve the listings.</Text>
				</>
			)} */}
      <Agenda
        items={meets}
        selected={date}
        renderEmptyData={() => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("NewMeet")}>
              <View style={styles.noMeets}>
                <Text style={styles.helloName}>Meeting létrehozása</Text>
                <Ionicons
                  style={styles.addMeet}
                  name="ios-add-circle"
                  size={24}
                  color="#F78F1E"
                />
              </View>
            </TouchableOpacity>
          );
        }}
        renderItem={(items) => {
          return (
            <>
              {items.status === 3 ? (
                <View style={styles.box}>
                  <TouchableOpacity onPress={deleteMeet}>
                    <View style={styles.headerView}>
                      <Text style={styles.helloName}>
                        {items.meets[0].title}
                      </Text>
                      <MaterialCommunityIcons
                        name="dots-horizontal"
                        size={24}
                        color="black"
                      />
                    </View>
                  </TouchableOpacity>

                  {items.meets[0].description.length != 0 &&
                  items.meets[0].description !== "-" ? (
                    <>
                      <View style={styles.descriptionView}>
                        <Text style={styles.description}>
                          {items.meets[0].description}
                        </Text>
                      </View>
                    </>
                  ) : null}

                  <View style={styles.partner}>
                    <View>
                      <Image
                        style={styles.withImage}
                        source={require("../../assets/profile.png")}
                      />
                    </View>
                    <View style={styles.partnerView}>
                      <Text style={styles.partnerName}>
                        {items.partner[0].name} - {items.partner[0].company}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.createdAtView}>
                    <Text style={styles.createdAt}>
                      Időpont: {items.meets[0].startDate} -{" "}
                      {items.meets[0].time}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.boxInactive}>
                  <Text style={styles.helloName}>{items.meets[0].title}</Text>

                  {items.meets[0].description.length != 0 &&
                  items.meets[0].description !== "-" ? (
                    <>
                      <View style={styles.descriptionView}>
                        <Text style={styles.description}>
                          {items.meets[0].description}
                        </Text>
                      </View>
                    </>
                  ) : null}

                  <View style={styles.partner}>
                    <View>
                      <Image
                        style={styles.withImage}
                        source={require("../../assets/profile.png")}
                      />
                    </View>
                    <View style={styles.partnerView}>
                      <Text style={styles.partnerName}>
                        {items.partner[0].company} - {items.partner[0].name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.createdAtView}>
                    <Text style={styles.createdAt}>
                      Időpont: {items.meets[0].startDate} -{" "}
                      {items.meets[0].time}
                    </Text>
                  </View>
                </View>
              )}
            </>
          );
        }}
        theme={{
          // calendarBackground: colors.white, //agenda background
          // agendaKnobColor: colors.primary, // knob color
          // backgroundColor: colors.background, // background color below agenda
          // agendaDayTextColor: colors.primary, // day name
          // agendaDayNumColor: colors.primary, // day number
          agendaTodayColor: colors.orange, // today in list
          monthTextColor: colors.gray, // name in calendar
          // textDefaultColor: "red",
          // todayBackgroundColor: colors.orange,
          textSectionTitleColor: colors.gray,
          selectedDayBackgroundColor: colors.orange, // calendar sel date
          // dayTextColor: colors.primary, // calendar day
          // dotColor: "white", // dots
          // textDisabledColor: "red",
        }}
        style={styles.calendar}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noMeets: { flexDirection: "row", padding: 10 },
  addMeet: { paddingLeft: 10 },
  createdAtView: { paddingTop: 14, fontSize: 15 },
  createdAt: { fontFamily: "PoppinsMedium", fontSize: 14, padding: 3 },
  calendar: {
    // knobContainer: {
    // flex: 1,
    // position: "absolute",
    // left: 0,
    // right: 0,
    // height: 24,
    // bottom: 0,
    // alignItems: "center",
    borderRadius: 10,
    // backgroundColor: "darkblue",
    // },
  },
  status: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    flex: 1,
  },
  declineView: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 8,
  },
  acceptView: {
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 8,
  },
  declineText: {
    fontFamily: "PoppinsLight",
    fontSize: 15,
    padding: 3,
  },
  acceptText: {
    fontFamily: "PoppinsLight",
    fontSize: 15,
    padding: 3,
  },
  questionText: {
    fontFamily: "PoppinsLight",
    fontSize: 15,
    padding: 3,
  },
  // end tabview
  partnerName: {
    paddingLeft: 12,
    fontFamily: "PoppinsLight",
    fontSize: 15,
  },
  partnerView: {
    alignItems: "center",
    justifyContent: "center",
  },
  partner: { flexDirection: "row", marginVertical: 10 },
  withImage: {
    height: 30,
    width: 30,
  },
  title: {
    fontSize: 25,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  box: {
    padding: 12,
    // marginBottom: 20,
    // justifyContent: "space-around",
    // marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  boxInactive: {
    padding: 12,
    opacity: 0.5,
    // marginBottom: 20,
    // justifyContent: "space-around",
    // marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  descriptionView: {
    marginVertical: 7,
  },
  helloName: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    flex: 1,
    flexWrap: "wrap",
  },
  description: {
    fontSize: 15,
    fontFamily: "PoppinsLight",
  },
  time: {
    fontSize: 15,
    fontFamily: "PoppinsLight",
  },
});

export default MeetsByCalendarScreen;
