import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";
import routes from "../navigation/routes";

function SplashScreen({ navigation }) {
	return (
		<>
			<View style={styles.logoContainer}>
				<Text style={styles.tagline}>Sell What Youdsa Don't Need</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<Button
					title="Login"
					onPress={() => navigation.navigate(routes.LOGIN)}
				/>
				<Button
					title="Register"
					color="secondary"
					onPress={() => navigation.navigate(routes.LOGIN)}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	buttonsContainer: {
		padding: 20,
		width: "100%",
	},
	logo: {
		width: 100,
		height: 100,
	},
	logoContainer: {
		position: "absolute",
		top: 70,
		alignItems: "center",
	},
	tagline: {
		fontSize: 25,
		fontWeight: "600",
		paddingVertical: 20,
	},
});

export default SplashScreen;
