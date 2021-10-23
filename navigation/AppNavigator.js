import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

// Components
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/Meets/MeetsByCalendarScreen";
import Meets from "../screens/Meets/Meets";
import AccountNavigator from "./AccountNavigator";
import navigation from "../navigation/rootNavigation";
import HomeStackNavigator from "./HomeStackNavigator";
import CreateMeet from "../screens/Profile/CreateMeet";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
	// useEffect(() => {
	// 	registerForPushNotifications();

	// 	// Notifications.addNotificationResponseReceivedListener(notification => {
	// 	// 	navigation.navigate("Account");
	// 	// });
	// }, []);
	const registerForPushNotifications = async () => {
		try {
			const permission = Permissions.askAsync(Permissions.NOTIFICATIONS);
			if (!(await permission).granted) return;
			const token = await Notifications.getExpoPushTokenAsync();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={HomeStackNavigator}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						// <AntDesign name="clockcircleo" size={20} color="gray" />
						<AntDesign name="home" color={color} size={size} />
					),
				}}
			/>

			<Tab.Screen
				name="Meets"
				component={Meets}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="bars" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="calendar" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="NewMeet"
				component={CreateMeet}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="pluscircle" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default AppNavigator;
