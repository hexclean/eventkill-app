import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Screen from "./Screen";
function Header(props) {
	return (
		<Screen>
			<View style={styles.welcome}>
				<Text style={styles.welcomeName}>Szia, József 👋</Text>
				<Image
					style={styles.profile}
					source={require("../../assets/profile.png")}
				/>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	welcome: {
		marginBottom: 5,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	welcomeName: {
		fontSize: 17,
		fontFamily: "PoppinsRegular",
	},
	profile: {
		height: 30,
		width: 30,
	},
});

export default Header;
