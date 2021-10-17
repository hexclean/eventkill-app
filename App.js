import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainContainer from "./screens/MainContainer";
import Login from "./screens/Login";
import AuthContext from "./auth/context";
import authStorage from "./auth/storage";
import AppLoading from "expo-app-loading";

export default function App() {
	const [user, setUser] = useState();
	const [isReady, setIsReady] = useState(false);

	const restoreUser = async () => {
		const user = await authStorage.getUser();
		if (user) setUser(user);
	};

	if (!isReady) {
		return (
			<AppLoading
				startAsync={restoreUser}
				onFinish={() => setIsReady(true)}
				onError={console.warn}
			/>
		);
	}

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{user ? <MainContainer /> : <Login />}
		</AuthContext.Provider>
	);
}
