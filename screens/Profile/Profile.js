import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	Image,
	ScrollView,
	TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import actionApi from "../../api/actions";
import useApi from "../../hooks/useApi";

// Components
import Screen from "../../components/Screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAuth from "../../auth/useAuth";
import getProfile from "../../api/profile";
import Loading from "../../components/ActivityIndicator";

const Profile = ({ navigation }) => {
	const { user, logOut } = useAuth();
	const getProfileInfo = useApi(getProfile.getProfileData);
	const [name, setName] = useState(user.user.name);
	const [company, setCompany] = useState(user.user.company);
	const postEditName = useApi(actionApi.editProfile);
	const postEditCompany = useApi(actionApi.editCompany);
	console.log("name", name);
	useEffect(() => {
		getProfileInfo.request();
		postEditName.request();
		setName(getProfileInfo.data.name);
		console.log("getProfileInfo.data.name", getProfileInfo.data.name);
		setCompany(getProfileInfo.data.company);
		console.log("call");
	}, []);

	const handleChangeName = e => {
		postEditName.request(e);
		setName(e);
	};

	const handleChangeCompany = e => {
		postEditCompany.request(e);
		setCompany(e);
	};

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

	return (
		<>
			<Loading visible={getProfileInfo.loading} />
			<Screen>
				{getProfileInfo.error && (
					<>
						<Text>Couldn't retrieve the listings.</Text>
					</>
				)}
				<View style={styles.head}>
					{/* <View style={styles.headContainer}>
					<Ionicons name="arrow-back" size={27} color="black" />
				</View> */}
					<View style={styles.profileInfo}>
						<Image
							style={styles.profileImage}
							source={require("../../assets/profile.png")}
						/>
						<View style={styles.mainInfo}>
							<Text style={styles.name}>{name}</Text>
							<Text style={styles.username}>@erdosjozsef</Text>
						</View>
					</View>

					<View>
						<TextInput
							onChangeText={e => {
								handleChangeCompany(e);
							}}
							style={styles.profileData}
							value={company}
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
							value={name}
						/>
						<Text style={styles.tapToChange}>Kattints a módosításhoz</Text>
						<View style={styles.separator} />
					</View>

					<View style={styles.settings}>
						<Text style={styles.profile}>Beállítások</Text>
					</View>
					<ScrollView>
						<View style={styles.settingItems}>
							<View>
								<Ionicons name="add-circle-outline" size={25} color="black" />
							</View>
							<TouchableOpacity onPress={() => navigation.navigate("NewMeet")}>
								<View style={styles.settingsView}>
									<Text style={styles.settingText}>Esemény létrehozása</Text>
								</View>
							</TouchableOpacity>
						</View>
						<View style={styles.settingItems}>
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
						</View>

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
						<TouchableOpacity onPress={() => navigation.navigate("About")}>
							<View style={styles.settingItems}>
								<View>
									<AntDesign name="infocirlceo" size={22} color="black" />
								</View>
								<View style={styles.settingsView}>
									<Text style={styles.settingText}>Fontos információk</Text>
								</View>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigation.navigate("Coffee")}>
							<View style={styles.settingItems}>
								<View>
									<Feather name="coffee" size={23} color="black" />
								</View>
								<View style={styles.settingsView}>
									<Text style={styles.settingText}>Küldj egy kávét</Text>
								</View>
							</View>
						</TouchableOpacity>
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
