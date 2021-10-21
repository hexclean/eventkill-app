import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/core";

// Components
import Screen from "../../components/Screen";
import AcceptedCard from "../../components/AcceptedCard";
import axios from "axios";
import authStorage from "../../auth/storage";
import Loading from "../../components/ActivityIndicator";

export default function AcceptedMeets() {
	const isFocused = useIsFocused();
	const [meets, setMeets] = useState(null);
	const [loading, setLoading] = useState(false);

	const getAcceptedMeets = async () => {
		const authToken = await authStorage.getToken();
		let data = {
			headers: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		setLoading(true);
		await axios
			.get("http://192.168.0.178:9000/api/meets/accepted", data)
			.then(response => {
				setMeets(response.data.result);
			});
		setLoading(false);
	};

	const postDeleteMeet = async meetId => {
		const authToken = await authStorage.getToken();
		let data = {
			header: {
				"x-auth-token": authToken,
				"content-type": "application/json",
			},
		};
		try {
			await axios.post(
				`http://192.168.0.178:9000/api/operation/delete/${meetId}`,
				data
			);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteMeet = async meet => {
		Alert.alert(
			"Meeting lemondása",
			"Leszeretnéd mondani a meetinget?",
			[
				{
					text: "Mégse",
					style: "cancel",
				},
				{
					text: "Igen",
					onPress: async () => {
						await postDeleteMeet(meet.id);
						await getAcceptedMeets();
						if (meet.status === 1) {
							Alert.alert("Lemondott Meeting", "desc", [
								{
									text: "Rendben",
									style: "cancel",
								},
							]);
						}
					},
				},
			],
			{ cancelable: false }
		);
	};

	useEffect(() => {
		getAcceptedMeets();
	}, [isFocused]);

	return (
		<Screen>
			{loading && (
				<>
					<Loading visible={true} />
				</>
			)}
			<FlatList
				style={styles.list}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				data={meets}
				extraData={meets}
				keyExtractor={listing => listing.id.toString()}
				renderItem={({ item }) => (
					<AcceptedCard item={item} deleteMeet={() => deleteMeet(item)} />
				)}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	loading: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
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
