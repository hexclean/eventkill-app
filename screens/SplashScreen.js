import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";
import colors from "../config/colors";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
	return (
		<ImageBackground
			blurRadius={10}
			style={styles.background}
			source={require("../assets/online.jpeg")}
		>
			<View style={styles.logoContainer}>
				<Image style={styles.logo} source={require("../assets/logo-red.png")} />
				<Text style={styles.tagline}>Eventkill</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<Button
					title="Bejelentkezés"
					onPress={() => navigation.navigate(routes.LOGIN)}
				/>
				<Button
					title="Regisztráció"
					color="secondary"
					onPress={() => navigation.navigate(routes.REGISTER)}
				/>
			</View>
		</ImageBackground>
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
		color: colors.white,
	},
});

export default WelcomeScreen;
