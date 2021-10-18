import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useFonts } from "expo-font";

// Components
import Screen from "../../components/Screen";
import DeletedCards from "../../components/DeletedCards";
import useApi from "../../hooks/useApi";
import meetsApi from "../../api/meets";

export default function DeletedMeetsScreen() {
	const getDeclinedMeets = useApi(meetsApi.getDeclinedMeets);

	useEffect(() => {
		getDeclinedMeets.request();
	}, []);

	const [loaded] = useFonts({
		PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
		PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
		PoppinsBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
	});

	if (!loaded) {
		return null;
	}
	return (
		<Screen>
			<FlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={getDeclinedMeets.data}
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
