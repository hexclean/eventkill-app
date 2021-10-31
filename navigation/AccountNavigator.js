import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import Profile from "../screens/Profile/Profile";
import Notifications from "../screens/Profile/Notifications";
import CreateMeet from "../screens/Profile/CreateMeet";
import About from "../screens/Profile/About";
import NextFeatures from "../screens/Profile/NextFeatures";
import CreatePartner from "../screens/Profile/CreatePartner";
import Coffee from "../screens/Profile/Coffee";

const Stack = createStackNavigator();

const AccountNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			options={{ headerShown: false }}
			name="Account"
			component={Profile}
		/>
		<Stack.Screen name="Notifications" component={Notifications} />
		<Stack.Screen name="About" component={About} />
		<Stack.Screen component={NextFeatures} />
		<Stack.Screen component={Coffee} />
	</Stack.Navigator>
);

export default AccountNavigator;
