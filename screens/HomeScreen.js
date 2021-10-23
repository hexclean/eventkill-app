import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Alert,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/core";

// Components
import Screen from "../components/Screen";
import Card from "../components/Card";
import Loading from "../components/ActivityIndicator";
import authStorage from "../auth/storage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function HomeScreen({ navigation, props }) {
	const isFocused = useIsFocused();
	const [meets, setMeets] = useState(null);
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
			.get("http://192.168.100.70:9000/api/meets/today", data)
			.then(response => {
				setMeets(response.data.result);
			});
		setLoading(false);
	};

	const getCheckMeetStatus = async meetId => {
		const authToken = await authStorage.getToken();
		let data = {
			headers: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		//
		return axios.get(
			`http://192.168.100.70:9000/api/meets/check/${meetId}`,
			data
		);

		//
	};

	const postDeleteMeet = async meetId => {
		const authToken = await authStorage.getToken();
		let data = {
			headers: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		try {
			await axios.post(
				`http://192.168.100.70:9000/api/operation/delete/${meetId}`,
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

	const deleteMeet = meet => {
		setLoading(true);
		getCheckMeetStatus(meet.id)
			.then(response => {
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
			.catch(err => {
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
				{/* {getTodayMeetsApi.error && (
					<>
						<Text>Couldn't retrieve the listings.</Text>
					</>
				)} */}
				<View style={styles.welcome}>
					<TouchableWithoutFeedback onPress={() => console.log("Press")}>
						<View style={styles.profileSection}>
							<Image
								style={styles.profileImage}
								source={require("../assets/profile.png")}
							/>
							<View style={styles.mainInfo}>
								<Text style={styles.name}>Erdős József</Text>
							</View>
						</View>
					</TouchableWithoutFeedback>

					{/* <View style={styles.testtt}>
						<MaterialIcons name="notifications" size={26} color="black" />
					</View> */}
				</View>
				<View style={styles.title}>
					<Text style={styles.start}>Mára tervezett megbeszéléseid</Text>
				</View>
				<FlatList
					style={styles.list}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					data={meets}
					extraData={meets}
					keyExtractor={listing => listing.id.toString()}
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
		height: 50,
		width: 50,
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
		// marginVertical: 10,
		// paddingBottom: 6,
		paddingTop: 10,
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
