import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/Meets/MeetsByCalendarScreen";
import Meets from "../screens/Meets/Meets";
import Profile from "../screens/Profile/Profile";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="home" color={color} size={size} />
					),
				}}
			/>
			{/* <Tab.Screen
				name="Meets"
				component={Meets}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="bars" color={color} size={size} />
					),
				}}
			/>

			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="calendar" color={color} size={size} />
					),
				}}
			/> */}
			<Tab.Screen
				name="Account"
				component={AccountNavigator}
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="profile" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default AppNavigator;
