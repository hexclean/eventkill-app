import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View } from "react-native";

function Screen(props) {
	return (
		<SafeAreaView style={[styles.screen]}>
			<View style={[styles.view]}>{props.children}</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		paddingTop: Constants.statusBarHeight,
		flex: 1,
	},
	view: {
		flex: 1,
		padding: 13,
		// backgroundColor: "blue",
	},
});

export default Screen;
