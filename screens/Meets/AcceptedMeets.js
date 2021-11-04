import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, FlatList, View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/core";

// Components
import Screen from "../../components/Screen";
import AcceptedCard from "../../components/AcceptedCard";
import axios from "axios";
import authStorage from "../../auth/storage";
import Loading from "../../components/ActivityIndicator";

export default function AcceptedMeets() {
  const isFocused = useIsFocused();
  const [meets, setMeets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getAcceptedMeets = async () => {
    const authToken = await authStorage.getToken();

    let data = {
      headers: {
        "x-auth-token": authToken,
        "content-type": "application/json",
      },
    };
    setLoading(true);
    await axios
      .get("https://api.eventkill.com/api/meets/accepted", data)
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

    return axios.get(
      `https://api.eventkill.com/api/meets/check/${meetId}`,
      data
    );
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
          `${meet.meets[0].title}`,
          "Leszeretnéd mondani a megbeszélést?",
          [
            {
              text: "Mégse",
              style: "cancel",
            },
            {
              text: "Igen",
              onPress: async () => {
                await postDeleteMeet(meet.id);
                await getAcceptedMeets();
                if (
                  response.data.result.creatorStatus === 4 &&
                  response.data.result.partnerStatus === 4
                ) {
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

  useEffect(() => {
    getAcceptedMeets();
  }, [isFocused]);

  return (
    <Screen>
      {loading && (
        <>
          <Loading visible={true} />
        </>
      )}
      {meets.length === 0 && (
        <View style={styles.noMeetView}>
          <Text style={styles.noMeetTitle}>Nincs elfogadott meeting</Text>
        </View>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={meets}
        extraData={meets}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <AcceptedCard item={item} deleteMeet={() => deleteMeet(item)} />
        )}
        refreshing={refreshing}
        onRefresh={async () => {
          await getAcceptedMeets();
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
