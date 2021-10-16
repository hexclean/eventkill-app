import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";
import { useFonts } from "expo-font";

// Components
import Screen from "../components/shared/Screen";
import DeletedCards from "../components/DeletedCards";

let initialMessages = [
	{
		status: 0,
		active: 0,
		id: "1",
		title: "Design Meeting",
		time: "10:00 - 12:00",
		description:
			"We will discuss the previous sprint bugs. If you have any questions please tell me!",
		partner: "Mobilszoft - erdos.jozsef@mobilszoft.hu",
	},
	{
		status: 1,
		active: 0,
		id: "2",
		title: "Development Meeting",
		time: "10:00 - 12:00",
		description:
			"We will discuss the previous sprint bugs. If you have any questions please tell me!",
		partner: "Primalskill",
	},
	{
		status: 0,
		active: 1,
		id: "3",
		title: "Development Meeting",
		time: "10:00 - 12:00",
		description:
			"We will discuss the previous sprint bugs. If you have any questions please tell me!",
		partner: "Primalskill",
	},
	{
		status: 1,
		active: 1,
		id: "4",
		title: "Development Meeting",
		time: "10:00 - 12:00",
		description:
			"We will discuss the previous sprint bugs. If you have any questions please tell me!",
		partner: "Primalskill",
	},
];

export default function PendingInvitation() {
	const [list, setList] = React.useState(initialMessages);
	// useEffect(() => {
	// 	console.log("again");
	// });
	const [loaded] = useFonts({
		PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
		PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
		PoppinsBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
	});

	if (!loaded) {
		return null;
	}
	return (
		<Screen>
			<FlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={list}
				keyExtractor={listing => listing.id.toString()}
				renderItem={({ item }) => (
					<DeletedCards
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
	);
}

const styles = StyleSheet.create({});
