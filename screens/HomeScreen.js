import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Alert,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Button,
} from "react-native";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";

// Components
import Screen from "../components/shared/Screen";
import Card from "../components/Card";
import meetsApi from "../api/meets";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import Loading from "../components/shared/Loading";

export default function HomeScreen({ navigation }) {
	const { user, logOut } = useAuth();
	const [meet, setMeet] = useState();

	const handleSubmit = async meet => {
		setMeet({
			description: "rom app",
		});
		const result = await meetsApi.createMeet(meet);

		if (!result.ok) {
			console.log(result);
			return alert("Could not save the listing");
		}
	};

	const getTodayMeetsApi = useApi(meetsApi.getTodayMeets);
	const [loaded] = useFonts({
		PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
		PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
		PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
	});

	useEffect(() => {
		getTodayMeetsApi.request();
	}, []);

	const deleteMeet = items => {
		Alert.alert(
			"Meeting lemondása",
			"Leszeretnéd mondani a meetinget?",
			[
				{
					text: "Mégse",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: "Igen",
					onPress: () => {
						const newList = list.filter(item => item.id !== items.id);
						setList(newList);
						if (items.active === 1) {
							Alert.alert(
								"Meeting elhalasztva!",
								"Az ügyfeled is lemondta a meetinget, így elmarad!",
								[{ text: "Rendben", onPress: () => console.log("OK Pressed") }],
								{ cancelable: false }
							);
						}
					},
				},
			],
			{ cancelable: false }
		);
	};

	if (!loaded) {
		return null;
	}

	return (
		<>
			<Loading visible={getTodayMeetsApi.loading} />
			<Screen>
				{getTodayMeetsApi.error && (
					<>
						<Text>Couldn't retrieve the listings.</Text>
					</>
				)}
				<View style={styles.welcome}>
					<Text style={styles.welcomeName}>Szia, {user.name}👋</Text>
					<TouchableOpacity onPress={() => handleSubmit(meet)}>
						{/* <TouchableOpacity onPress={() => logOut()}> */}
						{/* <TouchableOpacity onPress={() => navigation.navigate("Profile")}> */}
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
					data={getTodayMeetsApi.data}
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
