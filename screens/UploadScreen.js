import React from "react";
import { View, Modal, StyleSheet, Text } from "react-native";
import * as Progress from "react-native-progress";
import AnimatedLottieView from "lottie-react-native";

const UploadScreen = ({ progress = 0, visible = false, onDone }) => {
	return (
		<Modal visible={visible}>
			<View style={styles.container}>
				{progress < 1 ? (
					<Progress.Bar color={"orange"} progress={progress} width={200} />
				) : (
					<AnimatedLottieView
						onAnimationFinish={onDone}
						autoPlay
						loop={false}
						source={require("../assets/animations/done.json")}
						style={styles.animation}
					/>
				)}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	animation: { width: 150 },
	container: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
});

export default UploadScreen;
