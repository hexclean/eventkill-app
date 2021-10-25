import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Calendar } from "react-native-calendars";

// Components
import Screen from "../../components/Screen";
import meetsApi from "../../api/meets";
import {
	ScrollView,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const date = new Date();

export default function Coffee() {
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDay, setSelectedDay] = useState();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const showCalendarHandler = () => setShowCalendar(true);

	const handleSubmit = async () => {
		const items = {
			title: title,
			description: description,
			startDate: selectedDay,
		};

		const result = await meetsApi.Coffee(items);

		if (!result.ok) {
			console.log(result);
			return alert("Could not save the listing");
		}
	};

	const handleTitle = e => setTitle(e);
	const handleDescription = e => setDescription(e);

	const [loaded] = useFonts({
		PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
		PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
		PoppinsBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
		PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
		PoppinsThin: require("../../assets/fonts/Poppins-Thin.ttf"),
	});

	const onDayPress = day => {
		setSelectedDay(day.dateString);
		setShowCalendar(false);
	};

	return (
		<Screen>
			<View style={styles.container}>
				<View style={styles.titleView}>
					<Text style={styles.titleText}>Coffe</Text>
				</View>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
	},
	titleView: {
		fontFamily: "PoppinsBold",
		paddingTop: 25,
	},
	titleText: {
		fontSize: 20,
	},
	boxView: {
		marginTop: 20,
		borderColor: "gray",
		borderWidth: 0.6,
		borderRadius: 8,
	},
	boxViewCt: {
		padding: 5,
		paddingLeft: 10,
	},
	title: {
		fontSize: 12,

		fontFamily: "PoppinsLight",
	},
	textInput: {
		fontFamily: "PoppinsRegular",
		fontSize: 16,
	},
	createView: {
		marginVertical: 40,
		backgroundColor: "dodgerblue",
		borderRadius: 8,
		// height: 300
	},
	creat: {
		justifyContent: "center",
		alignItems: "center",
		height: 55,
	},
	createText: {
		fontFamily: "PoppinsBold",
		fontSize: 16,
		color: "white",
	},
});
