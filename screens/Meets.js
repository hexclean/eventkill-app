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
import { Ionicons } from "@expo/vector-icons";

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
				<Text style={styles.start}>Gyors áttekintés</Text>
				<TouchableOpacity onPress={() => console.log("profile")}>
					<Ionicons name="ios-add-circle" size={30} color="#F78F1E" />
				</TouchableOpacity>
			</View>
			<View style={styles.title}></View>
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
		paddingBottom: 18,
	},
	welcome: {
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
		fontSize: 20,
	},
});

export default Meets;
