import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableWithoutFeedback,
	TextInput,
	FlatList,
	TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useFonts } from "expo-font";
import { TimePickerModal } from "react-native-paper-dates";
import { DatePickerModal } from "react-native-paper-dates";
import { Formik } from "formik";
import * as Yup from "yup";

// Components
import Screen from "../../components/Screen";
import AppText from "../../components/Text";
import UploadScreen from "../UploadScreen";
import authStorage from "../../auth/storage";
import colors from "../../config/colors";
import { ScrollView } from "react-native-gesture-handler";

export default function CreateMeet({ navigation }) {
	// ! Start Date selector
	const [date, setDate] = React.useState(new Date());
	const [test, setTest] = useState("");
	const [dateOpen, setDateOpen] = React.useState(false);

	const onDismissSingleDate = React.useCallback(() => {
		setDateOpen(false);
	}, [setDateOpen]);

	const onConfirmSingleDate = React.useCallback(
		params => {
			setDateOpen(false);
			setDate(params.date);
		},
		[setDateOpen, setDate]
	);
	// ! End Date selector

	// ! Start Time selector
	const [visible, setVisible] = React.useState(false);
	const [hours, setHours] = React.useState("");
	const [minutes, setMinutes] = React.useState("");
	const onDismiss = React.useCallback(() => {
		setVisible(false);
	}, [setVisible]);

	const onConfirm = React.useCallback(
		({ hours, minutes }) => {
			setVisible(false);
			setHours(hours);
			setMinutes(minutes);
		},
		[setVisible]
	);
	// ! End Time selector

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState([]);

	const [partner, setPartner] = useState("");
	const [showUsers, setShowUsers] = useState(false);

	// ! Inputs
	const handleTitle = e => setTitle(e);
	const handleDescription = e => setDescription(e);
	//
	const [uploadVisible, setUploadVisible] = useState(false);
	const [progress, setProgress] = useState(0);

	// const handleSubmit = async () => {
	// 	const authToken = await authStorage.getToken();
	// 	const items = {
	// 		title: title,
	// 		user: selectedUser,
	// 		description: description,
	// 		date: date,
	// 		time: `${hours}:${minutes}`,
	// 		// invitedUserId: selectedUser.id,
	// 		// time: "10:00 - 11:30",
	// 	};
	// 	console.log(items);
	// 	let data = {
	// 		headers: {
	// 			"x-auth-token": authToken,
	// 			"content-type": "application/json",
	// 		},

	// 		onUploadProgress: progress =>
	// 			setProgress(progress.loaded / progress.total),
	// 	};
	// 	try {
	// 		setProgress(0);
	// 		setUploadVisible(true);
	// 		await axios
	// 			.post("https://api.eventkill.com/api/meets/create", items, data)
	// 			.then(response => {
	// 				if (response.data.status !== 200) {
	// 					setUploadVisible(false);
	// 				}
	// 			});
	// 		// setTitle("");
	// 		// setDescription("");
	// 		// setSelectedDate();
	// 		// setSelectedUser([]);
	// 		// setSendForm(true);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	useFonts({
		PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
		PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
		PoppinsBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
		PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
		PoppinsThin: require("../../assets/fonts/Poppins-Thin.ttf"),
	});

	useEffect(() => {
		getUsers();
		return () => {};
	}, []);

	const getUsers = async () => {
		const authToken = await authStorage.getToken();
		let data = {
			headers: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		// setLoading(true);
		await axios
			.get(`https://api.eventkill.com/api/meets/people`, data)
			.then(response => {
				setUsers(response.data.result);
			});
		// setLoading(false);
	};

	const ItemView = ({ item }) => {
		return (
			<View style={styles.searchedUsers}>
				<Text autoCorrect={false} style={styles.itemStyle}>
					{item.name}
				</Text>
				<TouchableWithoutFeedback onPress={() => selectAnUser(item)}>
					<View style={styles.addUserView}>
						<Text style={styles.selectButton}>Kiválasztás</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
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
				.get(`https://api.eventkill.com/api/meets/people/${text}`, data)
				.then(response => {
					// if (response.data.result.length > 0) {
					setShowUsers(true);
					setPartner(response.data.result);
					// }
				});
		}
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("asd").min(4).label("Title"),
		// user: Yup.number().required("number").min(1).label("user"),
	});

	return (
		<Screen>
			<ScrollView>
				<UploadScreen
					onDone={() => setUploadVisible(false)}
					progress={progress}
					visible={uploadVisible}
				/>

				<TimePickerModal
					visible={visible}
					onDismiss={onDismiss}
					onConfirm={onConfirm}
					hours={12} // default: current hours
					minutes={14} // default: current minutes
					label="Idő kiválasztása" // optional, default 'Select time'
					cancelLabel="Mégse" // optional, default: 'Cancel'
					confirmLabel="Mentés" // optional, default: 'Ok'
					animationType="fade" // optional, default is 'none'
					locale="en" // optional, default is automically detected by your system
				/>

				<DatePickerModal
					locale="en"
					mode="single"
					visible={dateOpen}
					onDismiss={onDismissSingleDate}
					date={date}
					onConfirm={onConfirmSingleDate}
					saveLabel="Mentés"
					label="Válaszd ki az időpontot"
				/>
				<Formik
					initialValues={{
						title: "",
						user: "",
					}}
					onSubmit={values => console.log(values)}
					validationSchema={validationSchema}
				>
					{({
						handleChange,
						handleSubmit,
						errors,
						setFieldTouched,
						touched,
					}) => (
						<>
							<View style={styles.inputView}>
								<Text style={styles.title}>Partner (kötelező)</Text>
								<TextInput
									style={styles.input}
									placeholderTextColor="#666666"
									placeholder="Partner neve"
									onChangeText={text => searchFilter(text)}
									// onChangeText={handleChange(selectedUser)}
								/>
								{showUsers && (
									<>
										<FlatList
											data={users}
											keyExtractor={(item, index) => index.toString()}
											renderItem={ItemView}
											selectedUser={() => selectAnUser(item)}
										/>
									</>
								)}
								{/* {touched.title && (
									<AppText style={{ color: "red" }}>{errors.user}</AppText>
								)} */}
							</View>
							<View style={styles.inputView}>
								<Text style={styles.title}>Cím (kötelező)</Text>
								<TextInput
									style={styles.input}
									placeholderTextColor="#666666"
									placeholder="Meeting címe"
									multiline={true}
									onChangeText={handleChange("title")}
									onBlur={() => setFieldTouched("title")}
								/>
								{touched.title && (
									<AppText style={{ color: "red" }}>{errors.title}</AppText>
								)}
							</View>
							<View style={styles.inputView}>
								<Text style={styles.title}>Leírás (nem kötelező)</Text>
								<TextInput
									style={styles.textarea}
									placeholderTextColor="#666666"
									placeholder="Meeting leírása"
									multiline={true}
									value={description}
									onChangeText={e => handleDescription(e)}
								/>
							</View>

							<View
								onPress={() => setDateOpen(true)}
								uppercase={false}
								mode="outlined"
								style={styles.inputView}
							>
								<Text
									onPress={() => setDateOpen(true)}
									uppercase={false}
									mode="outlined"
									style={styles.title}
								>
									Dátum (kötelező)
								</Text>
								<TextInput
									style={styles.input}
									placeholderTextColor="#666666"
									placeholder="datum"
									editable={false}
									value={test}
								/>
							</View>
							<View
								onPress={() => setVisible(true)}
								uppercase={false}
								mode="outlined"
								style={styles.inputView}
							>
								<Text
									onPress={() => setVisible(true)}
									uppercase={false}
									mode="outlined"
									style={styles.title}
								>
									Ido (kötelező)
								</Text>
								<TextInput
									style={styles.input}
									placeholderTextColor="#666666"
									placeholder="Időpontja"
									editable={false}
									value={hours && minutes && hours + ":" + minutes}
								/>
								{/* <AppText style={{ color: "red" }}>{errors.time}</AppText> */}
							</View>
							<TouchableOpacity onPress={handleSubmit}>
								<View style={styles.createView}>
									<View style={styles.creat}>
										<Text style={styles.createText}>Létrehozás</Text>
									</View>
								</View>
							</TouchableOpacity>
						</>
					)}
				</Formik>
			</ScrollView>
		</Screen>
	);
}

const styles = StyleSheet.create({
	selectButton: {
		// justifyContent: "center",
		// alignContent: "center",
		// alignItems: "center",
		color: colors.white,
		fontFamily: "PoppinsRegular",
		alignSelf: "center",
		alignItems: "center",
		// alignSelf: "center",
		// padding: 8,
		// textAlign: "center",
		// textAlignVertical: "center",
		// textAlign: "center",
	},
	addUserView: {
		// justifyContent: "center",
		paddingRight: 20,
		backgroundColor: colors.orange,
		borderRadius: 6,
		padding: 8,
		// width: 200,
		flexDirection: "row",
		// alignItems: "center",
	},
	searchedUsers: {
		justifyContent: "space-between",
		borderWidth: 1,
		borderColor: colors.borderColor,
		borderRadius: 8,
		marginTop: 12,
		// flex: 1,
		flexDirection: "row",
	},
	createView: {
		marginVertical: 30,
		borderRadius: 8,
		backgroundColor: colors.orange,
	},
	creat: {
		justifyContent: "center",
		alignItems: "center",
	},
	createText: {
		fontFamily: "PoppinsRegular",
		marginVertical: 8,
		fontSize: 15,
		color: "white",
	},
	time: { flexDirection: "row" },
	endTime: { paddingLeft: 30 },
	itemStyle: {
		padding: 15,
		fontFamily: "PoppinsRegular",
		fontSize: 14,
	},
	infoView: {
		flexDirection: "row",

		alignItems: "center",
	},
	startInfo: {
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
	errorText: {
		// padding: 10,
		paddingTop: 2,
		fontFamily: "PoppinsLight",
		color: colors.red,
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
	container: {
		flex: 1,
		backgroundColor: "white",
		padding: 10,
	},
	titleText: {
		padding: 8,
		fontSize: 16,
		textAlign: "center",
		fontWeight: "bold",
	},
	headingText: {
		padding: 8,
	},
});
