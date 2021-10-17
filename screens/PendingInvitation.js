import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useFonts } from "expo-font";
import { useIsFocused } from "@react-navigation/native";

// Components
import Screen from "../components/shared/Screen";
import PendingCards from "../components/PendingCards";
import useApi from "../hooks/useApi";
import meetsApi from "../api/meets";

export default function PendingInvitation({ navigation, props }) {
	const getPendingMeetsApi = useApi(meetsApi.getPendingMeets);
	const isFocused = useIsFocused();

	useEffect(() => {
		getPendingMeetsApi.request();
	}, []);

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
				data={getPendingMeetsApi.data}
				keyExtractor={listing => listing.id.toString()}
				renderItem={({ item }) => (
					<PendingCards
						id={item.id}
						deleteMeet={() => deleteMeet(item)}
						meetId={item.id}
						title={item.title}
						time={item.startDate}
						description={item.description}
						partner={item.partner}
					/>
				)}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({});
