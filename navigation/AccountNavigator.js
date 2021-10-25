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
		<Stack.Screen
			name="NewMeet"
			options={{ title: "Főoldal" }}
			options={{ headerShown: false }}
			component={CreateMeet}
		/>
		<Stack.Screen name="About" component={About} />
		<Stack.Screen
			headerMode="none"
			headerTitle={"da"}
			headerShown={false}
			options={() => ({
				title: "My Assignments",
				headerLeft: () => null,
			})}
			name="NextFeatures"
			component={NextFeatures}
		/>
		<Stack.Screen
			options={{ title: "Küldj egy kávét" }}
			name="Coffee"
			component={Coffee}
		/>
	</Stack.Navigator>
);

export default AccountNavigator;
