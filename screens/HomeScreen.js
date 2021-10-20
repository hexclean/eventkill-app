import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Alert,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/core";

// Components
import Screen from "../components/Screen";
import Card from "../components/Card";
import Loading from "../components/ActivityIndicator";
import authStorage from "../auth/storage";

export default function HomeScreen({ navigation, props }) {
	const isFocused = useIsFocused();
	const [meets, setMeets] = useState(0);
	const [meetStatus, setMeetStatus] = useState();
	const [loading, setLoading] = useState(false);

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
			.get("http://192.168.0.178:9000/api/meets/today", data)
			.then(response => {
				setMeets(response.data.result);
			});
		setLoading(false);
	};

	const getMeetStatus = async meetId => {
		const authToken = await authStorage.getToken();
		let data = {
			headers: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};

		await axios
			.get(`http://192.168.0.178:9000/api/meets/check-status/${meetId}`, data)
			.then(response => {
				console.log("response.data.result", response.data.result);
				setMeetStatus(response.data.result[0].status);
			});
	};

	const postDeleteMeet = async meetId => {
		const authToken = await authStorage.getToken();
		let data = {
			header: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		try {
			await axios.post(
				`http://192.168.0.178:9000/api/operation/delete/${meetId}`,
				data
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTodayMeets();
	}, []);

	const deleteMeet = async meetId => {
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
						await getMeetStatus(meetId.id);
						await postDeleteMeet(meetId.id);
						await getTodayMeets();

						// setMeets(prevState => {
						// 	setMeets(prevState.filter(item => item.id !== meetId.id));
						// });
						console.log("meet", meetId.id);
						console.log("meetStatus", meetStatus);
						if (meetStatus === 1) {
							Alert.alert("Lemondott Meeting", "desc", [
								{
									text: "Rendben",
									style: "cancel",
								},
							]);
						}
					},

					// if (state === 1) {
					// 	Alert.alert(
					// 		"Meeting elhalasztva!",
					// 		"Az ügyfeled is lemondta a meetinget, így elmarad!",
					// 		[{ text: "Rendben", onPress: () => setMeetId(state) }],
					// 		{ cancelable: false }
					// 	);
					// }
				},
			],
			{ cancelable: false }
		);
	};

	if (!loaded) {
		return null;
	}

	// console.log("render elott", meets);
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
					<Text style={styles.welcomeName}>Szia, joco👋</Text>

					<TouchableOpacity>
						<Feather name="settings" size={25} color="#F78F1E" />
					</TouchableOpacity>
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
						<Card
							id={item.id}
							deleteMeet={() => deleteMeet(item)}
							meetId={item.id}
							title={item.title}
							time={item.time}
							description={item.description}
							partner={item.partner}
						/>
					)}
				/>
			</Screen>
		</>
	);
}
const styles = StyleSheet.create({
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
		paddingBottom: 6,
	},
	welcome: {
		marginBottom: 5,
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
		fontSize: 20,
	},
});
