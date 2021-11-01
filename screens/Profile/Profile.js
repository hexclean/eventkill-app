import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	Image,
	ScrollView,
	TextInput,
	Alert,
} from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import actionApi from "../../api/actions";
import useApi from "../../hooks/useApi";
import { useIsFocused } from "@react-navigation/core";
// Components
import Screen from "../../components/Screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAuth from "../../auth/useAuth";
import getProfile from "../../api/profile";
import Loading from "../../components/ActivityIndicator";
import authStorage from "../../auth/storage";
const Profile = ({ navigation }) => {
	const isFocused = useIsFocused();
	const [nameReq, setNameReq] = useState("");
	const [username, setUsername] = useState("");
	const [companyReq, setCompanyReq] = useState("");
	const getTodayMeets = async () => {
		const authToken = await authStorage.getToken();

		let data = {
			headers: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		// setLoading(true);
		await axios
			.get("https://api.eventkill.com/api/profile", data)
			.then(response => {
				setNameReq(response.data.result.name);
				setCompanyReq(response.data.result.company);
				setUsername(response.data.result.username);
				// setMeets(response.data.result);
			});
		// setLoading(false);
	};
	useEffect(() => {
		getTodayMeets();
	}, [isFocused]);
	const { user, logOut } = useAuth();

	const postEditName = useApi(actionApi.editProfile);
	const postEditCompany = useApi(actionApi.editCompany);

	const handleChangeName = e => {
		postEditName.request(e);
		setNameReq(e);
	};

	const handleChangeCompany = e => {
		postEditCompany.request(e);
		setCompanyReq(e);
	};
	const [company, setCompany] = useState(companyReq);

	const [loaded] = useFonts({
		PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
		PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
		PoppinsBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
		PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
		PoppinsThin: require("../../assets/fonts/Poppins-Thin.ttf"),
	});
	if (!loaded) {
		return null;
	}

	const deleteAccount = async () => {
		try {
			Alert.alert(
				"Fiók törlése",
				"A fiókod törlésével minden adatod törlődik véglegesen!",
				[
					{
						text: "Mégse",
						style: "cancel",
					},
					{
						text: "Igen",
						onPress: async () => {
							const authToken = await authStorage.getToken();

							let data = {
								headers: {
									"x-auth-token": authToken,
									"content-type": "application/json",
								},
							};
							await axios.post(
								"https://api.eventkill.com/api/profile/delete-account",
								{},
								data
							);
							logOut();
						},
					},
				]
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{/* <Loading visible={getProfileInfo.loading} /> */}
			<Screen>
				{/* {getProfileInfo.error && (
					<>
						<Text>Couldn't retrieve the listings.</Text>
					</>
				)} */}
				<View style={styles.head}>
					{/* <View style={styles.headContainer}>
					<Ionicons name="arrow-back" size={27} color="black" />
				</View> */}
					{/* <View>
						<Ionicons name="close" size={30} color="black" />
					</View> */}
					<View style={styles.profileInfo}>
						<Image
							style={styles.profileImage}
							source={require("../../assets/profile.png")}
						/>
						<View style={styles.mainInfo}>
							<Text style={styles.name}>{nameReq}</Text>
							<Text style={styles.username}>{username}</Text>
						</View>
					</View>

					<View>
						<TextInput
							onChangeText={e => {
								handleChangeCompany(e);
							}}
							style={styles.profileData}
							value={companyReq}
						/>
						<Text style={styles.tapToChange}>Kattints a módosításhoz</Text>
						<View style={styles.separator} />
					</View>
					<View style={styles.companyView}>
						<TextInput
							onChangeText={e => {
								handleChangeName(e);
							}}
							style={styles.profileData}
							value={nameReq}
						/>
						<Text style={styles.tapToChange}>Kattints a módosításhoz</Text>
						<View style={styles.separator} />
					</View>

					<View style={styles.settings}>
						<Text style={styles.profile}>Beállítások</Text>
					</View>
					<ScrollView>
						{/* <View style={styles.settingItems}>
							<View>
								<Ionicons
									name="notifications-outline"
									size={25}
									color="black"
								/>
							</View>
							<TouchableOpacity
								onPress={() => navigation.navigate("Notifications")}
							>
								<View style={styles.settingsView}>
									<Text style={styles.settingText}>Értesítések</Text>
								</View>
							</TouchableOpacity>
						</View> */}

						<TouchableOpacity
							onPress={() => navigation.navigate("NextFeatures")}
						>
							<View style={styles.settingItems}>
								<View>
									<Entypo name="code" size={24} color="black" />
								</View>
								<View style={styles.settingsView}>
									<Text style={styles.settingText}>Következő fejlesztések</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => deleteAccount()}>
							<View style={styles.settingItems}>
								<View>
									<AntDesign name="delete" size={24} color="black" />
								</View>
								<View style={styles.settingsView}>
									<Text style={styles.settingText}>Fiók végleges törlése</Text>
								</View>
							</View>
						</TouchableOpacity>
						{/* <TouchableOpacity onPress={() => navigation.navigate("About")}>
							<View style={styles.settingItems}>
								<View>
									<AntDesign name="infocirlceo" size={22} color="black" />
								</View>
								<View style={styles.settingsView}>
									<Text style={styles.settingText}>Fontos információk</Text>
								</View>
							</View>
						</TouchableOpacity> */}
						{/* <TouchableOpacity onPress={() => navigation.navigate("Coffee")}>
							<View style={styles.settingItems}>
								<View>
									<Feather name="coffee" size={23} color="black" />
								</View>
								<View style={styles.settingsView}>
									<Text style={styles.settingText}>Küldj egy kávét</Text>
								</View>
							</View>
						</TouchableOpacity> */}
						<TouchableOpacity onPress={() => logOut()}>
							<View style={styles.settingItems}>
								<View>
									<MaterialIcons name="logout" size={24} color="black" />
								</View>
								<View style={styles.settingsView}>
									<Text style={styles.settingText}>Kijelentkezés</Text>
								</View>
							</View>
						</TouchableOpacity>
					</ScrollView>
					<View style={styles.versionView}>
						<Text style={styles.versionText}>Verzió: 0.1 (beta)</Text>
					</View>
				</View>
			</Screen>
		</>
	);
};

const styles = StyleSheet.create({
	versionView: {
		alignItems: "center",
		justifyContent: "center",
	},
	versionText: {
		fontFamily: "PoppinsLight",
		fontSize: 10,
	},

	companyView: { paddingTop: 23 },
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	head: {
		flex: 1,
		padding: 8,
	},
	headContainer: {
		flexDirection: "row",
	},
	name: {
		paddingLeft: 18,
		fontFamily: "PoppinsBold",
		fontSize: 20,
	},
	username: {
		paddingLeft: 20,
		fontFamily: "PoppinsLight",
		fontSize: 15,
	},
	profileImage: {
		height: 50,
		width: 50,
		borderRadius: 50,
	},
	profileInfo: {
		flexDirection: "row",
		// backgroundColor: "red",
		marginVertical: 20,
	},
	mainInfo: {
		justifyContent: "center",
	},
	profile: {
		fontFamily: "PoppinsMedium",
		fontSize: 20,
	},
	profileData: {
		fontFamily: "PoppinsLight",
		fontSize: 17,
	},
	tapToChange: {
		fontFamily: "PoppinsThin",
		fontSize: 14,
	},
	separator: {
		width: "100%",
		height: 1,
		backgroundColor: "#848484",
		opacity: 0.2,
	},
	settings: { paddingTop: 25 },
	settingItems: {
		flexDirection: "row",
		paddingTop: 20,
	},
	settingText: {
		fontFamily: "PoppinsMedium",
		fontSize: 16,
		paddingLeft: 13,
	},
	settingsView: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Profile;
