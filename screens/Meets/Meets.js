import React from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	TouchableOpacity,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";

// Components
import Screen from "../../components/Screen";
import PendingInvitation from "./PendingMeets";
import DeletedMeets from "./DeletedMeetsScreen";
import AcceptedMeets from "./AcceptedMeets";

const PendingInvitationTab = () => <PendingInvitation />;

const DeletedMeetsTab = () => <DeletedMeets />;

const renderScene = SceneMap({
	first: PendingInvitationTab,
	deleted: DeletedMeetsTab,
	accepted: AcceptedMeets,
});

const Meets = () => {
	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "first", title: "Függőben" },
		{ key: "accepted", title: "Elfogadott" },
		{ key: "deleted", title: "Lemondott" },
	]);

	return (
		<Screen>
			<View style={styles.welcome}>
				<Text style={styles.start}>Gyors áttekintés</Text>
			</View>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				tabStyle={{ backgroundColor: "red" }}
			/>
		</Screen>
	);
};

const styles = StyleSheet.create({
	profile: {
		height: 30,
		width: 30,
	},

	welcome: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 13,
	},
	list: {
		paddingTop: 20,
	},
	welcomeName: {
		fontSize: 17,
		fontFamily: "PoppinsRegular",
	},
	start: {
		fontFamily: "PoppinsBold",
		fontSize: 20,
	},
});

export default Meets;
