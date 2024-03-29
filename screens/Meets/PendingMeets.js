import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/core";

// Components
import Screen from "../../components/Screen";
import PendingCards from "../../components/PendingCards";
import axios from "axios";
import authStorage from "../../auth/storage";
import Loading from "../../components/ActivityIndicator";

export default function PendingMeets() {
  const isFocused = useIsFocused();
  const [meets, setMeets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getPendingMeets = async () => {
    const authToken = await authStorage.getToken();
    let data = {
      headers: {
        "x-auth-token": authToken,
        "content-type": "application/json",
      },
    };
    setLoading(true);
    await axios
      .get("https://api.eventkill.com/api/meets/pending", data)
      .then((response) => {
        console.log(response.data.result);
        setMeets(response.data.result);
      });
    setLoading(false);
  };

  const postAcceptMeet = async (meetId) => {
    const authToken = await authStorage.getToken();
    let data = {
      headers: {
        "x-auth-token": authToken,
        "content-type": "application/json",
      },
    };
    try {
      await axios.post(
        `https://api.eventkill.com/api/operation/accept/${meetId}`,
        {},
        data
      );
    } catch (error) {
      console.log(error);
    }
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

  const deleteMeet = (meet) => {
    setLoading(true);
    getCheckMeetStatus(meet.id)
      .then((response) => {
        setLoading(false);
        Alert.alert(
          `${meet.meets[0].title}`,
          "Elutasítod a megbeszélést?",
          [
            {
              text: "Mégse",
              style: "cancel",
            },
            {
              text: "Igen",
              onPress: async () => {
                await postDeleteMeet(meet.id);
                await getPendingMeets();
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

  const acceptMeet = (meet) => {
    Alert.alert(
      `${meet.meets[0].title}`,
      "Elfogadod a megbeszélést?",
      [
        {
          text: "Mégse",
          style: "cancel",
        },
        {
          text: "Igen",
          onPress: async () => {
            await postAcceptMeet(meet.id);
            await getPendingMeets();
          },
        },
      ],
      { cancelable: false }
    );

    // .catch(err => {
    // 	setLoading(false);
    // });
  };

  useEffect(() => {
    getPendingMeets();
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
          <Text style={styles.noMeetTitle}>Nincs függőben lévő meeting</Text>
        </View>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={meets}
        extraData={meets}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <PendingCards
            item={item}
            deleteMeet={() => deleteMeet(item)}
            acceptMeet={() => acceptMeet(item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={async () => {
          await getPendingMeets();
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
