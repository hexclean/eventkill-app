import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

// Components
import Screen from "../../components/shared/Screen";
import PendingCards from "../../components/PendingCards";
import useApi from "../../hooks/useApi";
import meetsApi from "../../api/meets";
import acceptMeet from "../../api/actions";

export default function PendingMeets() {
	const [clicked, setClicked] = useState(0);

	const getPendingMeetsApi = useApi(meetsApi.getPendingMeets);
	const postAcceptMeet = useApi(acceptMeet.acceptMeetHandler);
	const postDeleteMeet = useApi(acceptMeet.deleteMeetHandler);

	useEffect(() => {
		getPendingMeetsApi.request();
	}, [clicked]);

	const acceptMeetHandler = id => {
		postAcceptMeet.request(id);
		setClicked(clicked + 1);
	};

	const deleteMeetHandler = id => {
		postDeleteMeet.request(id);
		setClicked(clicked + 1);
	};

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
						acceptMeet={() => acceptMeetHandler(item.id)}
						deleteMeet={() => deleteMeetHandler(item.id)}
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
