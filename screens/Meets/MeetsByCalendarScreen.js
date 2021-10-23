import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { Agenda } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";

// Components
import Screen from "../../components/Screen";
import useApi from "../../hooks/useApi";
import meetsApi from "../../api/meets";
import Loading from "../../components/ActivityIndicator";

const date = new Date();
const MeetsByCalendarScreen = ({ navigation }) => {
	const getCalendarMeetsApi = useApi(meetsApi.getCalendarMeets);

	useEffect(() => {
		getCalendarMeetsApi.request();
	}, []);

	const [loaded] = useFonts({
		PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
		PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
	});
	if (!loaded) {
		return null;
	}
	const deleteMeet = () => {
		Alert.alert(
			"Meeting lemondása",
			"Leszeretnéd mondani a meetinget?",
			[
				{
					text: "Mégse",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{ text: "Igen", onPress: () => console.log("OK Pressed") },
			],
			{ cancelable: false }
		);
	};

	return (
		<>
			<Loading visible={getCalendarMeetsApi.loading} />
			<Screen>
				{getCalendarMeetsApi.error && (
					<>
						<Text>Couldn't retrieve the listings.</Text>
					</>
				)}
				<Agenda
					items={getCalendarMeetsApi.data}
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
					renderItem={items => {
						return (
							<TouchableWithoutFeedback onLongPress={deleteMeet}>
								<View style={styles.box}>
									<View style={styles.boxHeader}>
										<Text style={styles.helloName}>{items.title}</Text>
										<Text style={styles.time}>{items.time}</Text>
									</View>

									<View style={styles.descriptionView}>
										<Text style={styles.description}>{items.description}</Text>
									</View>
									<View style={styles.partner}>
										<Image
											style={styles.withImage}
											source={require("../../assets/profile.png")}
										/>
										<View style={styles.partnerView}>
											<Text style={styles.partnerName}>
												{items.partner[0].company} - {items.partner[0].name}
											</Text>
										</View>
									</View>
								</View>
							</TouchableWithoutFeedback>
						);
					}}
				/>
			</Screen>
		</>
	);
};

const styles = StyleSheet.create({
	addMeet: {
		paddingLeft: 10,
	},
	noMeets: {
		padding: 12,
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
		flexDirection: "row",
		elevation: 3,
	},
	partnerName: {
		paddingLeft: 12,
		fontFamily: "PoppinsBold",
		fontSize: 15,
	},
	partnerView: {
		alignItems: "center",
		justifyContent: "center",
	},
	partner: { flexDirection: "row" },
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
	boxHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	descriptionView: {
		marginVertical: 7,
	},
	helloName: {
		fontSize: 16,
		fontFamily: "PoppinsMedium",
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
