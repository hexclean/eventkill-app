import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./auth/context";
import authStorage from "./auth/storage";
import AppLoading from "expo-app-loading";

// Components
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import Profile from "./screens/Profile/Profile";
import Notifications from "./screens/Profile/Notifications";
import About from "./screens/Profile/About";

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
		// <NavigationContainer>
		// 	<Profile />
		// </NavigationContainer>

		<NavigationContainer>
			<AuthContext.Provider value={{ user, setUser }}>
				{user ? <AppNavigator /> : <AuthNavigator />}
			</AuthContext.Provider>
		</NavigationContainer>
	);
}
