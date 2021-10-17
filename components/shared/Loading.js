import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

const Loading = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#F78F1E" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
});

export default Loading;
