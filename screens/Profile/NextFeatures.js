import React, { useState } from "react";
import { View, StyleSheet, Switch, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

// Components
import Screen from "../../components/Screen";

const NextFeatures = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => {
		setIsEnabled(previousState => !previousState);
	};

	const [loaded] = useFonts({
		PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
		PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
		PoppinsBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
	});
	return (
		<Screen>
			<View style={styles.settings}>
				<Text style={styles.notifications}>
					Következő fejlesztések -> (1.0)
				</Text>
				<Text style={styles.description}>
					1. Google naptár szinkronizálása 📅
				</Text>
				<Text style={styles.description}>
					2. Push értesítések beállítása 🔔
				</Text>
				<Text style={styles.description}>3. Egyedi design 🔥</Text>
				<Text style={styles.nextFeatures}>Következő fejlesztések -> (1.1)</Text>
				<Text style={styles.description}>1. Partnerek létrehozása 🫂</Text>
				<Text style={styles.description}>2. Analitika 📟</Text>
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	backText: {
		fontFamily: "PoppinsMedium",
	},

	settings: { marginVertical: 15 },
	notifications: {
		fontFamily: "PoppinsMedium",
		fontSize: 20,
	},
	nextFeatures: {
		fontFamily: "PoppinsMedium",
		fontSize: 20,
		paddingTop: 30,
	},
	description: {
		fontFamily: "PoppinsMedium",
		fontSize: 15,
		marginTop: 10,
	},
});

export default NextFeatures;
