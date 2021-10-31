import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { View, Text, StyleSheet, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
// Components
import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/Meets/MeetsByCalendarScreen";
import Meets from "../screens/Meets/Meets";
import AccountNavigator from "./AccountNavigator";
import navigation from "../navigation/rootNavigation";
import HomeStackNavigator from "./HomeStackNavigator";
import CreateMeet from "../screens/Profile/CreateMeet";
import colors from "../config/colors";
import CreatedMeets from "../screens/CreatedMeets";
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
	const customTabBarStyle = {
		activeTintColor: colors.orange,
		inactiveTintColor: "gray",
		style: { backgroundColor: "white" },
	};
	return (
		// <Tab.Navigator
		// 	tabBarOptions={{
		// 		showLabel: false,
		// 		style: {
		// 			position: "absolute",
		// 			bottom: 25,
		// 			left: 20,
		// 			right: 20,
		// 			elevation: 0,
		// 			backgroundColor: "#ffffff",
		// 			borderRadius: 15,
		// 			height: 90,
		// 		},
		// 	}}
		// >
		// 	<Tab.Screen
		// 		name="Home"
		// 		component={HomeStackNavigator}
		// 		// options={{
		// 		// 	title: "Kezdőlap",
		// 		// 	headerShown: false,
		// 		// 	tabBarIcon: ({ color, size }) => (
		// 		// 		<AntDesign name="home" color={color} size={20} />
		// 		// 	),
		// 		// }}
		// 	/>

		// 	<Tab.Screen
		// 		name="Meets"
		// 		component={Meets}
		// 		// options={{
		// 		// 	title: "Megbeszélések",
		// 		// 	headerShown: false,
		// 		// 	tabBarIcon: ({ color, size }) => (
		// 		// 		<AntDesign name="bars" color={color} size={20} />
		// 		// 	),
		// 		// }}
		// 	/>
		// 	<Tab.Screen
		// 		name="Settings"
		// 		component={SettingsScreen}
		// 		// options={{
		// 		// 	title: "Naptár",
		// 		// 	headerShown: false,
		// 		// 	tabBarIcon: ({ color, size }) => (
		// 		// 		<AntDesign name="calendar" color={color} size={20} />
		// 		// 	),
		// 		// }}
		// 	/>
		// 	<Tab.Screen
		// 		name="NewMeet"
		// 		component={CreateMeet}
		// 		// options={{
		// 		// 	title: "Új esemény",
		// 		// 	// headerShown: false,
		// 		// 	tabBarIcon: ({ color, size }) => (
		// 		// 		<AntDesign name="pluscircle" color={color} size={20} />
		// 		// 	),
		// 		// }}
		// 	/>
		// 	<Tab.Screen
		// 		name="test"
		// 		component={CreateMeet}
		// 		// options={{
		// 		// 	title: "Új esemény",
		// 		// 	// headerShown: false,
		// 		// 	tabBarIcon: ({ color, size }) => (
		// 		// 		<AntDesign name="pluscircle" color={color} size={20} />
		// 		// 	),
		// 		// }}
		// 	/>
		// </Tab.Navigator>
		<Tab.Navigator
			initialRouteName="Home"
			activeColor="#fff"
			tabBarOptions={customTabBarStyle}
			shifting="false"
		>
			<Tab.Screen
				name="Home"
				options={{
					headerShown: false,
					tabBarLabel: "Kezdőlap",
					tabBarIcon: ({ color }) => (
						<AntDesign name="home" size={24} color="black" />
					),
				}}
				component={HomeStackNavigator}
			/>
			<Tab.Screen
				name="Meets"
				options={{
					headerShown: false,
					tabBarVisible: false,
					tabBarLabel: "Megbeszélések",
					tabBarIcon: ({ color }) => (
						<SimpleLineIcons name="list" size={24} color="black" />
					),
				}}
				component={Meets}
			/>
			<Tab.Screen
				name="NewMeet"
				options={{
					title: "Új megbeszélés létrehozása",
					tabBarLabel: "Létrehozás",
					tabBarIcon: ({ color }) => (
						<View
							style={{
								position: "absolute",
								bottom: 0, // space from bottombar
								height: 60,
								width: 68,
								borderRadius: 68,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<AntDesign name="pluscircle" size={28} color="black" />
						</View>
					),
				}}
				component={CreateMeet}
			/>
			<Tab.Screen
				name="Store"
				options={{
					headerShown: false,
					tabBarLabel: "Naptár",
					tabBarIcon: ({ color }) => (
						<AntDesign name="calendar" size={23} color="black" />
					),
				}}
				component={CalendarScreen}
			/>
			<Tab.Screen
				name="Profile"
				options={{
					tabBarLabel: "Kiküldött",
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<Entypo name="new-message" size={23} color="black" />
					),
				}}
				component={CreatedMeets}
			/>
		</Tab.Navigator>
	);
};

// const styles = StyleSheet.create({

// })

export default AppNavigator;
