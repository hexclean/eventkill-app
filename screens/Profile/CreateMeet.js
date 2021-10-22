import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	TextInput,
	Keyboard,
	FlatList,
	TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import { Calendar } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";
// Components
import Screen from "../../components/Screen";
import meetsApi from "../../api/meets";
import authStorage from "../../auth/storage";
import users from "../../api/users";
const date = new Date();

export default function CreateMeet() {
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [partner, setPartner] = useState("");
	const [showUsers, setShowUsers] = useState(false);
	const showCalendarHandler = () => setShowCalendar(true);
	const [selectedUser, setSelectedUser] = useState([]);

	const handleSubmit = async meetId => {
		const authToken = await authStorage.getToken();
		const items = {
			title: title,
			description: description,
			startDate: selectedDate,
			invitedUserId: selectedUser.id,
			startHour: "10:00",
			endHour: "12:25",
		};

		try {
			await axios.post("http://192.168.0.178:9000/api/meets/create", items);
		} catch (error) {
			console.log(error);
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
		setSelectedDate(day.dateString);
		setShowCalendar(false);
	};

	useEffect(() => {
		fetchPosts();
		return () => {};
	}, []);

	const fetchPosts = async meetId => {
		const authToken = await authStorage.getToken();
		let data = {
			headers: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		// setLoading(true);
		await axios
			.get(`http://192.168.0.178:9000/api/meets/people`, data)
			.then(response => {
				setPartner(response.data.result);
			});
		// setLoading(false);
	};

	const ItemView = ({ item }) => {
		return (
			<TouchableWithoutFeedback onPress={() => selectAnUser(item)}>
				<View>
					<Text style={styles.itemStyle}>
						{item.id}
						{". "}
						{item.name}
					</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	};

	const ItemSeparatorView = () => {
		return (
			<View
				style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
			/>
		);
	};

	const selectAnUser = user => {
		setSelectedUser(user);
		setShowUsers(false);
	};

	const searchFilter = async text => {
		setSelectedUser([]);
		const authToken = await authStorage.getToken();

		let data = {
			headers: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		if (text) {
			await axios
				.get(`http://192.168.0.178:9000/api/meets/people/${text}`, data)
				.then(response => {
					// if (response.data.result.length > 0) {
					setShowUsers(true);
					setPartner(response.data.result);
					// }
				});
		}
	};

	return (
		<Screen>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View>
					{/* <ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				> */}
					<View>
						<Text>ew</Text>
						<View style={styles.separator} />
					</View>
					<View style={styles.inputView}>
						<Text style={styles.title}>Partner (kötelező)</Text>
						<TextInput
							style={styles.input}
							placeholderTextColor="#666666"
							placeholder="Partner neve"
							value={selectedUser.name}
							onChangeText={text => searchFilter(text)}
						/>
						{partner.length < 0 && <Text>4325678</Text>}
						{showUsers && (
							<>
								<FlatList
									data={partner}
									keyExtractor={(item, index) => index.toString()}
									ItemSeparatorComponent={ItemSeparatorView}
									renderItem={ItemView}
									selectedUser={() => selectAnUser(item)}
								/>
							</>
						)}
					</View>
					<View style={styles.inputView}>
						<Text style={styles.title}>Cím (kötelező)</Text>
						<TextInput
							style={styles.input}
							placeholderTextColor="#666666"
							placeholder="Meeting címe"
							multiline={true}
							onChangeText={e => {
								handleTitle(e);
							}}
						/>
					</View>
					<View style={styles.inputView}>
						<Text style={styles.title}>Leírás (nem kötelező)</Text>
						<TextInput
							style={styles.textarea}
							placeholderTextColor="#666666"
							placeholder="Meeting leírása"
							multiline={true}
							onChangeText={e => {
								handleDescription(e);
							}}
						/>
					</View>

					<View style={styles.inputView}>
						<Text style={styles.title}>Dátum (kötelező)</Text>
						<TextInput
							onFocus={() => console.log("s")}
							style={styles.input}
							placeholderTextColor="#666666"
							placeholder="Meeting időpontja"
							value={selectedDate}
							onTouchStart={() => showCalendarHandler()}
							editable={false}
						/>
					</View>

					{showCalendar && (
						<Calendar
							style={styles.input}
							current={date}
							markingType={"multi-dot"}
							onDayPress={day => onDayPress(day)}
							enableSwipeMonths={true}
							markedDates={{
								"2021-10-22": {
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
							}}
						/>
					)}

					<View style={styles.inputView}>
						<Text style={styles.title}>Időpont (kötelező)</Text>
						<TextInput
							style={styles.input}
							placeholderTextColor="#666666"
							placeholder="Meeting időpontja"
							multiline={true}
						/>
						<View style={styles.infoView}>
							<View>
								<AntDesign name="checkcircle" size={17} color="green" />
							</View>
							<View style={styles.startInfoView}>
								<Text style={styles.startInfo}>
									Az eseményre 2021. július 14-én 14:00 és 15:35 között kerül
									sor.
								</Text>
							</View>
						</View>
					</View>
					<TouchableOpacity onPress={() => handleSubmit()}>
						<View style={styles.createView}>
							<View style={styles.creat}>
								<Text style={styles.createText}>Létrehozás</Text>
							</View>
						</View>
					</TouchableOpacity>
					{/* </ScrollView> */}
				</View>
			</TouchableWithoutFeedback>
		</Screen>
	);
}

const styles = StyleSheet.create({
	itemStyle: { padding: 15 },
	startInfoView: {
		// justifyContent: "center",
		// alignItems: "center",
	},
	infoView: {
		flexDirection: "row",

		alignItems: "center",
	},
	startInfo: {
		// justifyContent: "center",
		// alignItems: "center",
		alignContent: "center",
		paddingTop: 10,
		paddingLeft: 10,
		fontFamily: "PoppinsLight",
		fontSize: 13,
	},
	inputView: { marginVertical: 5 },
	title: {
		fontFamily: "PoppinsRegular",
		marginVertical: 8,
		fontSize: 15,
	},
	separator: {
		width: "100%",
		height: 1,
		backgroundColor: "gray",
		opacity: 0.4,
	},
	input: {
		borderWidth: 1,
		borderRadius: 8,
		backgroundColor: "#E6E6E6",
		padding: 10,
		paddingTop: 10,
		fontFamily: "PoppinsLight",
		borderColor: "#C1C1C1",
	},
	textarea: {
		borderWidth: 1,
		borderRadius: 8,
		backgroundColor: "#E6E6E6",
		padding: 10,
		paddingTop: 10,
		fontFamily: "PoppinsLight",
		borderColor: "#C1C1C1",
		height: 110,
	},
	// titleView: {
	// 	fontFamily: "PoppinsBold",
	// 	// paddingTop: 25,
	// 	// justifyContent: "center",
	// 	// alignItems: "center",
	// },
	// titleText: {
	// 	fontSize: 20,
	// },
	// boxView: {
	// 	marginTop: 20,
	// 	borderColor: "gray",
	// 	borderWidth: 0.6,
	// 	borderRadius: 8,
	// },
	// boxViewCt: {
	// 	padding: 5,
	// 	paddingLeft: 10,
	// },
	// title: {
	// 	fontSize: 12,

	// 	fontFamily: "PoppinsLight",
	// },
	// textInput: {
	// 	fontFamily: "PoppinsRegular",
	// 	fontSize: 16,
	// },
	// createView: {
	// 	marginVertical: 40,
	// 	backgroundColor: "dodgerblue",
	// 	borderRadius: 8,
	// 	// height: 300
	// },
	// creat: {
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	height: 55,
	// },
	// createText: {
	// 	fontFamily: "PoppinsBold",
	// 	fontSize: 16,
	// 	color: "white",
	// },
});
