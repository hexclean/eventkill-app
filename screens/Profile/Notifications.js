import React, { useState } from "react";
import { View, StyleSheet, Switch, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

// Components
import Screen from "../../components/Screen";

const Notifications = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => {
		console.log("dsa");
		setIsEnabled(previousState => !previousState);
	};

	const [loaded] = useFonts({
		PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
		PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
		PoppinsBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
	});
	return (
		<Screen>
			<View style={styles.container}>
				{/* <View style={styles.backCont}>
					<Ionicons name="arrow-back" size={27} color="black" />
					<View style={styles.backView}>
						<Text style={styles.backText}>Vissza</Text>
					</View>
				</View> */}
				<View style={styles.settings}>
					<Text style={styles.notifications}>Értesítések</Text>
					<Text style={styles.description}>
						Itt beállíthatod, hogy milyen értesítéseket szeretnél kapni
					</Text>
				</View>
				<View style={styles.noti}>
					<View style={styles.notiText}>
						<Text style={styles.info}>Push noti</Text>
					</View>
					<View>
						<Switch
							trackColor={{ false: "#767577", true: "#46D364" }}
							thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
							style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
				</View>
				<Text style={styles.infoDesc}>
					Ha valaki meghivot kuld akkor a telefonon egy ertesites fog megjelenni{" "}
				</Text>
				<View style={styles.separator} />
				<View style={styles.noti}>
					<View style={styles.notiText}>
						<Text style={styles.info}>E-mail értesítés</Text>
					</View>
					<View>
						<Switch
							trackColor={{ false: "#767577", true: "#46D364" }}
							thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
							style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
				</View>
				<Text style={styles.infoDesc}>
					Ha valaki meghivot kuld akkor emailben is értesítést fogsz kapni.
				</Text>
				<View style={styles.separator} />
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	separator: {
		width: "100%",
		height: 1,
		opacity: 0.3,
		backgroundColor: "gray",
	},
	infoDesc: {
		fontFamily: "PoppinsRegular",
		fontSize: 14,
		marginBottom: 4,
	},
	noti: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10,
	},
	notiText: {
		justifyContent: "center",
	},
	info: {
		fontSize: 18,
		fontFamily: "PoppinsMedium",
	},
	container: {
		flex: 1,
		padding: 8,
	},
	backCont: {
		flexDirection: "row",
	},
	backText: {
		fontFamily: "PoppinsMedium",
	},
	backView: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
	},
	settings: { marginVertical: 25 },
	notifications: {
		fontFamily: "PoppinsMedium",
		fontSize: 20,
	},
	description: {
		fontFamily: "PoppinsMedium",
		fontSize: 14,
		marginTop: 10,
	},
});

export default Notifications;
