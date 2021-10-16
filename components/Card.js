import React from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	Image,
} from "react-native";
import { useFonts } from "expo-font";

function Card(props) {
	const [loaded] = useFonts({
		PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
		PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
	});
	if (!loaded) {
		return null;
	}

	return (
		<TouchableWithoutFeedback onLongPress={props.deleteMeet}>
			<View style={styles.box}>
				<View style={styles.boxHeader}>
					<Text style={styles.helloName}>
						{props.title} - {props.id}
					</Text>
					<Text style={styles.time}>{props.time}</Text>
				</View>

				<View style={styles.descriptionView}>
					<Text style={styles.description}>{props.description}</Text>
				</View>
				<View style={styles.partner}>
					<Image
						style={styles.withImage}
						source={require("../assets/profile.png")}
					/>
					<View style={styles.partnerView}>
						<Text style={styles.partnerName}>{props.partner}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	partnerName: {
		paddingLeft: 12,
		fontFamily: "PoppinsLight",
		fontSize: 15,
	},
	partnerView: {
		alignItems: "center",
		justifyContent: "center",
	},
	partner: { flexDirection: "row" },
	withImage: {
		height: 30,
		width: 30,
	},
	title: {
		fontSize: 25,
		fontFamily: "Poppins-Bold",
		color: "white",
	},
	box: {
		padding: 12,
		// marginBottom: 20,
		// justifyContent: "space-around",
		// marginHorizontal: 5,
		backgroundColor: "white",
		borderRadius: 8,
		marginVertical: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	boxHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	descriptionView: {
		marginVertical: 7,
	},
	helloName: {
		fontSize: 16,
		fontFamily: "PoppinsMedium",
	},
	description: {
		fontSize: 15,
		fontFamily: "PoppinsLight",
	},
	time: {
		fontSize: 15,
		fontFamily: "PoppinsLight",
	},
});

export default Card;
