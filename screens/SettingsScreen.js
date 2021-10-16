import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { Agenda } from "react-native-calendars";

// Components
import Screen from "../components/shared/Screen";

const SettingsScreen = ({ navigation }) => {
	const [loaded] = useFonts({
		PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
		PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
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
		<Screen>
			<Agenda
				items={{
					"2021-10-01": [
						{
							id: 1,
							title: "Design Meeting",
							time: "10:00 - 11:00",
							description:
								"We will discuss the previous sprint bugs. If you have any questions please tell me!",
							partner: "Mobilszoft - erdos.jozsef@mobilszoft.hu",
						},
						{
							id: 2,
							title: "Design Meeting",
							time: "10:00 - 12:00",
							description:
								"We will discuss the previous sprint bugs. If you have any questions please tell me!",
							partner: "Mobilszoft - erdos.jozsef@mobilszoft.hu",
						},
					],
					"2021-10-15": [
						{
							id: 3,
							title: "Development Meeting",
							time: "08:00 - 12:00",
							description:
								"We will discuss the previous sprint bugs. If you have any questions please tell me!",
							partner: "Primalskill",
						},
						{
							id: 4,
							title: "Design Meeting",
							time: "18:00 - 20:00",
							description:
								"We will discuss the previous sprint bugs. If you have any questions please tell me!",
							partner: "Mobilszoft - erdos.jozsef@mobilszoft.hu",
						},
					],
					"2021-10-16": [
						{
							id: 3,
							title: "Development Meeting",
							time: "08:00 - 12:00",
							description:
								"We will discuss the previous sprint bugs. If you have any questions please tell me!",
							partner: "Primalskill",
						},
						{
							id: 4,
							title: "Design Meeting",
							time: "18:00 - 20:00",
							description:
								"We will discuss the previous sprint bugs. If you have any questions please tell me!",
							partner: "Mobilszoft - erdos.jozsef@mobilszoft.hu",
						},
					],
					"2021-10-18": [
						{
							id: "3",
							title: "Development Meeting",
							time: "10:00 - 12:00",
							description:
								"We will discuss the previous sprint bugs. If you have any questions please tell me!",
							partner: "Primalskill",
						},
					],
					"2021-10-14": [],
					"2021-10-13": [],
					"2021-10-12": [],
					"2021-10-11": [],
					"2021-10-10": [],
				}}
				selected={"2021-10-16"}
				renderEmptyDate={() => {
					return (
						<View style={styles.noMeets}>
							<View style={styles.boxHeader}>
								<Text style={styles.helloName}>Nincs meeting</Text>
							</View>
						</View>
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
										source={require("../assets/profile.png")}
									/>
									<View style={styles.partnerView}>
										<Text style={styles.partnerName}>{items.partner}</Text>
									</View>
								</View>
							</View>
						</TouchableWithoutFeedback>
					);
				}}
			/>
		</Screen>
	);
};

const styles = StyleSheet.create({
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

		elevation: 3,
	},
	partnerName: {
		paddingLeft: 12,
		fontFamily: "PoppinsLight",
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

export default SettingsScreen;
