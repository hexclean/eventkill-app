import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/core";

// Components
import Screen from "../../components/Screen";
import PendingCards from "../../components/PendingCards";
import axios from "axios";
import authStorage from "../../auth/storage";
import Loading from "../../components/ActivityIndicator";

export default function PendingMeets() {
	const isFocused = useIsFocused();
	const [meets, setMeets] = useState(null);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const getPendingMeets = async () => {
		const authToken = await authStorage.getToken();
		let data = {
			headers: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		setLoading(true);
		await axios
			.get("http://192.168.100.70:9000/api/meets/pending", data)
			.then(response => {
				setMeets(response.data.result);
			});
		setLoading(false);
	};

	const postAcceptMeet = async meetId => {
		const authToken = await authStorage.getToken();
		let data = {
			headers: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		try {
			await axios.post(
				`http://192.168.100.70:9000/api/operation/accept/${meetId}`,
				{},
				data
			);
			await getPendingMeets();
		} catch (error) {
			console.log(error);
		}
	};

	const postDeclineMeet = async meetId => {
		const authToken = await authStorage.getToken();
		let data = {
			header: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		try {
			await axios.post(
				`http://192.168.100.70:9000/api/operation/decline/${meetId}`,
				data
			);
			await getPendingMeets();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPendingMeets();
	}, [isFocused]);

	return (
		<Screen>
			{loading && (
				<>
					<Loading visible={true} />
				</>
			)}
			<FlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={meets}
				extraData={meets}
				keyExtractor={listing => listing.id.toString()}
				renderItem={({ item }) => (
					<PendingCards
						item={item}
						acceptMeet={() =>
							Alert.alert(
								"Elfogadod a meetinget?",
								item.title,
								[
									{
										text: "Mégse",
										style: "cancel",
									},
									{
										text: "Igen",
										onPress: async () => {
											await postAcceptMeet(item.id);
										},
									},
								],
								{ cancelable: false }
							)
						}
						postDeclineMeet={() =>
							Alert.alert(
								"Elutasítod a meetinget?",
								item.title,
								[
									{
										text: "Mégse",
										style: "cancel",
									},
									{
										text: "Igen",
										onPress: async () => {
											await postDeclineMeet(item.id);
										},
									},
								],
								{ cancelable: false }
							)
						}
					/>
				)}
				refreshing={refreshing}
				onRefresh={async () => {
					await getPendingMeets();
				}}
			/>
		</Screen>
	);
}
