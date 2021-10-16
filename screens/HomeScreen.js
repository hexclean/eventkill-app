import React from "react";
import {
	View,
	Text,
	Alert,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";

import Screen from "../components/shared/Screen";
import Card from "../components/Card";

let initialMessages = [
	{
		active: 0,
		id: "1",
		title: "Design Meeting",
		time: "10:00 - 12:00",
		description:
			"We will discuss the previous sprint bugs. If you have any questions please tell me!",
		partner: "Mobilszoft - erdos.jozsef@mobilszoft.hu",
	},
	{
		active: 0,
		id: "2",
		title: "Development Meeting",
		time: "10:00 - 12:00",
		description:
			"We will discuss the previous sprint bugs. If you have any questions please tell me!",
		partner: "Primalskill",
	},
	{
		active: 1,
		id: "3",
		title: "Development Meeting",
		time: "10:00 - 12:00",
		description:
			"We will discuss the previous sprint bugs. If you have any questions please tell me!",
		partner: "Primalskill",
	},
	{
		active: 1,
		id: "4",
		title: "Development Meeting",
		time: "10:00 - 12:00",
		description:
			"We will discuss the previous sprint bugs. If you have any questions please tell me!",
		partner: "Primalskill",
	},
];

export default function HomeScreen({ navigation }) {
	const [list, setList] = React.useState(initialMessages);

	const [loaded] = useFonts({
		PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
		PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
		PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
	});

	if (!loaded) {
		return null;
	}

	const deleteMeet = items => {
		Alert.alert(
			"Meeting lemondása",
			"Leszeretnéd mondani a meetinget?",
			[
				{
					text: "Mégse",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: "Igen",
					onPress: () => {
						const newList = list.filter(item => item.id !== items.id);
						setList(newList);
						if (items.active === 1) {
							Alert.alert(
								"Meeting elhalasztva!",
								"Az ügyfeled is lemondta a meetinget, így elmarad!",
								[{ text: "Rendben", onPress: () => console.log("OK Pressed") }],
								{ cancelable: false }
							);
						}
					},
				},
			],
			{ cancelable: false }
		);
	};

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

			<FlatList
				style={styles.list}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={list}
				keyExtractor={listing => listing.id.toString()}
				renderItem={({ item }) => (
					<Card
						id={item.id}
						deleteMeet={() => deleteMeet(item)}
						meetId={item.id}
						title={item.title}
						time={item.time}
						description={item.description}
						partner={item.partner}
					/>
				)}
			/>
		</Screen>

		// <TabView
		// 	navigationState={{ index, routes }}
		// 	renderScene={renderScene}
		// 	onIndexChange={setIndex}
		// 	initialLayout={{ width: layout.width }}
		// />
	);
}
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
