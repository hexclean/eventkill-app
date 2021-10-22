import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useFonts } from "expo-font";
import axios from "axios";

// Components
import Screen from "../../components/Screen";
import DeletedCards from "../../components/DeletedCards";
import authStorage from "../../auth/storage";
export default function DeletedMeetsScreen() {
	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [meets, setMeets] = useState(null);

	const getDeletedMeets = async () => {
		const authToken = await authStorage.getToken();

		let data = {
			headers: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		setLoading(true);
		await axios
			.get("http://192.168.0.178:9000/api/meets/declined", data)
			.then(response => {
				setMeets(response.data.result);
			});
		setLoading(false);
	};

	useEffect(() => {
		getDeletedMeets();
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
				data={meets}
				extraData={meets}
				keyExtractor={listing => listing.id.toString()}
				renderItem={({ item }) => <DeletedCards item={item} />}
				refreshing={refreshing}
				onRefresh={async () => {
					await getDeletedMeets();
				}}
			/>
		</Screen>
	);
}
