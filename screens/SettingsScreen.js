import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { Card, Avatar } from "react-native-paper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Swipeout from "react-native-swipeout";
// Components
import Screen from "../components/shared/Screen";

// onPress={() => navigation.navigate("Home")}
const timeToString = time => {
	const date = new Date(time);
	return date.toISOString().split("T")[0];
};

const SettingsScreen = ({ navigation }) => {
	const [loaded] = useFonts({
		PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
		PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
	});
	if (!loaded) {
		return null;
	}
	var deleteMeetById = [
		{
			text: "Törlés",
			onPress: 1,
		},
	];

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
								<Text style={styles.helloName}>No meeting!</Text>
							</View>
						</View>
					);
				}}
				renderItem={items => {
					return (
						<Swipeout
							style={{ marginTop: 17, marginRight: 10 }}
							right={deleteMeetById}
						>
							{/* <TouchableOpacity onPress={() => console.log(items)}> */}
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
							{/* </TouchableOpacity> */}
						</Swipeout>
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
