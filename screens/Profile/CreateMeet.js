import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Input } from "react-native";
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

export default function CreateMeet() {
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDay, setSelectedDay] = useState();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [partner, selectedPartner] = useState(null);

	const showCalendarHandler = () => setShowCalendar(true);

	const handleSubmit = async () => {
		const items = {
			title: title,
			description: description,
			startDate: selectedDay,
		};

		const result = await meetsApi.createMeet(items);

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
		console.log(day.dateString);
		setSelectedDay(day.dateString);
		setShowCalendar(false);
	};

	return (
		<Screen>
			<View style={styles.titleView}>
				<Text style={styles.titleText}>Új esemény létrehozása</Text>
			</View>

			<ScrollView>
				<View style={styles.boxView}>
					<View style={styles.boxViewCt}>
						<Text style={styles.title}>Meghívó címe (kötelező)</Text>
					</View>
					<View style={styles.boxViewCt}>
						<TextInput
							style={styles.textInput}
							placeholder="Kattints a gépeléshez"
							placeholderTextColor="gray"
							onChangeText={e => {
								handleTitle(e);
							}}
						/>
					</View>
				</View>
				<View style={styles.boxView}>
					<View style={styles.boxViewCt}>
						<Text style={styles.title}>Meghívó leírása (nem kötelező)</Text>
					</View>
					<View style={styles.boxViewCt}>
						<TextInput
							style={styles.textInput}
							placeholder="Kattints a gépeléshez"
							placeholderTextColor="gray"
							onChangeText={e => {
								handleDescription(e);
							}}
						/>
					</View>
				</View>
				<View style={styles.boxView}>
					<View style={styles.boxViewCt}>
						<Text style={styles.title}>Dátum (kötelező)</Text>
					</View>
					<TouchableWithoutFeedback onPress={() => showCalendarHandler()}>
						<View style={styles.boxViewCt}>
							<Text
								style={styles.textInput}
								placeholder="Kattints a dátum választásért"
								placeholderTextColor="gray"
							>
								{selectedDay}
							</Text>
						</View>
					</TouchableWithoutFeedback>

					{showCalendar && (
						<Calendar
							style={styles.calendar}
							current={date}
							markingType={"multi-dot"}
							onDayPress={day => onDayPress(day)}
							enableSwipeMonths={true}
							markedDates={{
								"2012-05-08": {
									selected: true,
									dots: [
										{
											key: "vacation",
											color: "blue",
											selectedDotColor: "red",
										},
										{
											key: "massage",
											color: "red",
											selectedDotColor: "white",
										},
									],
								},
								"2012-05-09": {
									disabled: true,
									dots: [
										{
											key: "vacation",
											color: "green",
											selectedDotColor: "red",
										},
										{
											key: "massage",
											color: "red",
											selectedDotColor: "green",
										},
									],
								},
							}}
						/>
					)}
				</View>

				<View style={styles.boxView}>
					<View style={styles.boxViewCt}>
						<Text style={styles.title}>Partner (kötelező)</Text>
					</View>
					<View style={styles.boxViewCt}>
						<TextInput
							style={styles.textInput}
							placeholder="Kattints a partner kereséshez"
							placeholderTextColor="gray"
							value={partner}
						/>
					</View>
				</View>

				<TouchableOpacity onPress={() => handleSubmit()}>
					<View style={styles.createView}>
						<View style={styles.creat}>
							<Text style={styles.createText}>Létrehozás</Text>
						</View>
					</View>
				</TouchableOpacity>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	titleView: {
		fontFamily: "PoppinsBold",
		paddingTop: 25,
		justifyContent: "center",
		alignItems: "center",
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
