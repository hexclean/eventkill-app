import React, { useState } from "react";
import { View, StyleSheet, Switch, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

// Components
import Screen from "../../components/Screen";

const CreatePartner = () => {
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
				<View style={styles.settings}>
					<Text style={styles.notifications}>CreatePartner</Text>
					<Text style={styles.description}>
						Itt beállíthatod, hogy milyen értesítéseket szeretnél kapni
					</Text>
				</View>
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
	},
	backCont: {
		flexDirection: "row",
	},
	backView: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
	},
	backText: {
		fontFamily: "PoppinsMedium",
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

export default CreatePartner;
