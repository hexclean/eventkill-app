import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FirstTab() {
	useEffect(() => {
		console.log("again");
	});
	return (
		<View>
			<Text style={styles.test}>hello</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	test: {
		color: "white",
	},
});
