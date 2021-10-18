import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

// import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary" }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "red",
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
		padding: 15,
		width: "100%",
		marginVertical: 10,
	},
	text: {
		color: "red",
		fontSize: 18,
		textTransform: "uppercase",
		fontWeight: "bold",
	},
});

export default AppButton;
