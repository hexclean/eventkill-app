import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MeetItemDeleteAction = props => {
	return (
		<TouchableWithoutFeedback onPress={props.onPress}>
			<View style={styles.container}>
				<MaterialCommunityIcons size={30} name="trash-can" color="white" />
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ff5252",
		width: 90,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
});

export default MeetItemDeleteAction;
