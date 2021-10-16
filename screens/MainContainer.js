import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

// Screens
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import SettingsScreen from "./SettingsScreen";
import Login from "./Login";
import Register from "./Register";
// Screen names
const homeName = "Home";
const detailName = "Details";
const settingsName = "Settings";
const loginName = "Login";
const registerName = "Register";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName={homeName}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let rn = route.name;

						if (rn === homeName) {
							iconName = focused ? "home" : "home";
						} else if (rn === detailName) {
							iconName = focused ? "plus" : "plus";
						} else if (rn === settingsName) {
							iconName = focused ? "calendar" : "calendar";
						} else if (rn === homeName) {
							iconName = focused ? "calendar" : "calendar";
						} else if (rn === registerName) {
							iconName = focused ? "calendar" : "calendar";
						}
						return <AntDesign name={iconName} size={size} color={color} />;
					},
					headerShown: false,
					tabBarStyle: {
						// style: {
						// position: "absolute",
						// bottom: 25,
						// left: 20,
						// right: 20,
						// height: 70,
						// borderRadius: 30,
						// elevation: 8,
						// },
					},
				})}
				// tabBarOptions={
				// 	{
				// showLabel: false,
				// activeTintColor: "blue",
				// inactiveTintColor: "grey",
				// labelStyle: { fontSize: 12 },
				// style: { padding: 10, height: 100 },
				// 	}
				// }
			>
				{/* <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }}/> */}
				<Tab.Screen
					name={homeName}
					component={HomeScreen}
					options={{ tabBarShowLabel: false }}
				/>
				<Tab.Screen
					options={{ tabBarShowLabel: false }}
					name={detailName}
					component={DetailsScreen}
				/>
				<Tab.Screen
					options={{ tabBarShowLabel: false }}
					name={settingsName}
					component={SettingsScreen}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
