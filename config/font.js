export default {};
const [loaded] = useFonts({
	PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
	PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
	PoppinsBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
	PoppinsLight: require("../../assets/fonts/Poppins-Light.ttf"),
	PoppinsThin: require("../../assets/fonts/Poppins-Thin.ttf"),
});
if (!loaded) {
	return null;
}
