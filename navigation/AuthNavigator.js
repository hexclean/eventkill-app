import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/Auth/Login";
import RegisterScreen from "../screens/Auth/Register";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="Welcome"
			component={SplashScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			options={{
				title: "Bejelentkezés",
				headerBackTitle: "Vissza",
			}}
			name="Login"
			component={LoginScreen}
		/>
		<Stack.Screen
			options={{
				title: "Regisztráció",
				headerBackTitle: "Vissza",
			}}
			name="Register"
			component={RegisterScreen}
		/>
	</Stack.Navigator>
);

export default AuthNavigator;
