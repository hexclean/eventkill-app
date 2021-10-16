import React from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	Image,
	TouchableOpacity,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

// Components
import Screen from "../components/shared/Screen";
import PendingInvitation from "./PendingInvitation";
import DeletedMeets from "./DeletedMeets";

const PendingInvitationTab = () => <PendingInvitation />;

const DeletedMeetsTab = () => <DeletedMeets />;

const renderScene = SceneMap({
	first: PendingInvitationTab,
	deleted: DeletedMeetsTab,
});

const Meets = ({ navigation }) => {
	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		// { key: "first", title: "Ma" },
		{ key: "first", title: "Függőben" },
		{ key: "deleted", title: "Elhalasztott" },
	]);

	return (
		<Screen>
			<View style={styles.welcome}>
				<Text style={styles.welcomeName}>Szia, József 👋</Text>
				<TouchableOpacity onPress={() => console.log("profile")}>
					<Image
						style={styles.profile}
						source={require("../assets/profile.png")}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.title}>
				<Text style={styles.start}>A mai megbeszéléseid</Text>
			</View>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
			/>
		</Screen>
	);
};

const styles = StyleSheet.create({
	profile: {
		height: 30,
		width: 30,
	},
	title: {
		// marginVertical: 10,
		paddingBottom: 6,
	},
	welcome: {
		marginBottom: 5,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	list: {
		paddingTop: 20,
	},
	welcomeName: {
		fontSize: 17,
		// fontWeight: "400",
		fontFamily: "PoppinsRegular",
	},
	start: {
		fontFamily: "PoppinsBold",
		paddingTop: 7,
		fontSize: 20,
	},
});

export default Meets;
