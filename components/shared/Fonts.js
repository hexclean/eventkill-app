import { useFonts } from "expo-font";

const Fonts = () => {
	const [loaded] = useFonts({
		PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
		PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
		PoppinsBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
		PoppinsLight: require("../../assets/fonts/Poppins-SemiBold.ttf"),
	});

	if (!loaded) {
		return null;
	}

	return { PoppinsMedium, PoppinsRegular, PoppinsBold, PoppinsLight };
};

export default Fonts;
