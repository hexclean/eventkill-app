import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

function PendingCards(props) {
  const [loaded] = useFonts({
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const description = props.item.meets[0].description;

  return (
    <View style={styles.box}>
      <View style={styles.headerView}>
        <Text style={styles.helloName}>{props.item.meets[0].title}</Text>
        <TouchableOpacity onPress={props.deleteMeet}>
          <EvilIcons name="trash" size={25} color="black" />
        </TouchableOpacity>
      </View>

      {description.length != 0 && description !== "-" ? (
        <>
          <View style={styles.descriptionView}>
            <Text style={styles.description}>
              {props.item.meets[0].description}
            </Text>
          </View>
        </>
      ) : null}

      <View style={styles.partner}>
        <View>
          <Image
            style={styles.withImage}
            source={require("../assets/profile.png")}
          />
        </View>
        <View style={styles.partnerView}>
          <Text style={styles.partnerName}>
            {props.item.partner[0].name} - {props.item.partner[0].company}
          </Text>
        </View>
      </View>
      <View style={styles.createdAtView}>
        <Text style={styles.createdAt}>
          Időpont: {props.item.startDate} ({props.item.meets[0].startTime}:
          {props.item.meets[0].endTime})
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // start tabview
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createdAtView: { paddingTop: 14, fontSize: 15 },
  createdAt: { fontFamily: "PoppinsMedium", fontSize: 14, padding: 3 },

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
    // color: "white",
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
export default PendingCards;
