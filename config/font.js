import React from "react";
import { useFonts } from "expo-font";

const font = () => {
	const [loaded] = useFonts({
		PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
		PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
	});
	if (!loaded) {
		return null;
	}
	return <div></div>;
};

export default font;
