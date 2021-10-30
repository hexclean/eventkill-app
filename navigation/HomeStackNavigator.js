import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import CreateMeet from "../screens/Profile/CreateMeet";
import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile/Profile";
import Notifications from "../screens/Profile/Notifications";
import About from "../screens/Profile/About";
import NextFeatures from "../screens/Profile/NextFeatures";
import CreatePartner from "../screens/Profile/CreatePartner";
import Coffee from "../screens/Profile/Coffee";

const Stack = createStackNavigator();

const HomeStackNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			options={{ headerShown: false }}
			name="Home"
			component={HomeScreen}
			tabBarVisible={false}
		/>
		<Stack.Screen
			name="NewMeet"
			options={{ headerShown: false }}
			component={CreateMeet}
		/>
		<Stack.Screen
			name="Profile"
			options={{ headerShown: false, tabBarVisible: false }}
			component={Profile}
			tabBarVisible={false}
		/>
		<Stack.Screen
			options={{ headerShown: false }}
			name="Account"
			component={Profile}
		/>
		<Stack.Screen name="Notifications" component={Notifications} />
		<Stack.Screen name="About" component={About} />
		<Stack.Screen
			options={{
				title: "Következő fejlesztések",
				headerBackTitle: "Vissza",
			}}
			name="NextFeatures"
			component={NextFeatures}
		/>
		<Stack.Screen name="CreatePartner" component={CreatePartner} />
		<Stack.Screen name="Coffee" component={Coffee} />
	</Stack.Navigator>
);

export default HomeStackNavigator;
