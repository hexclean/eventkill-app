import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	Platform,
	StyleSheet,
	ScrollView,
} from "react-native";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import SocialButton from "../../components/SocialButton";

import authApi from "../../api/auth";
import useAuth from "../../auth/useAuth";
const Login = ({ navigation }) => {
	const { logIn } = useAuth();

	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async ({ email, password }) => {
		const result = await authApi.login("erdosjozsef20@gmail.com", "123456");
		logIn(result.data.result[0].token);
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Image source={require("../../assets/sapiens.png")} style={styles.logo} />
			<Text style={styles.text}>RN Social App</Text>

			<FormInput
				labelValue={email}
				onChangeText={userEmail => setEmail(userEmail)}
				placeholderText="Email"
				iconType="user"
				keyboardType="email-address"
				autoCapitalize="none"
				autoCorrect={false}
			/>

			<FormInput
				labelValue={password}
				onChangeText={userPassword => setPassword(userPassword)}
				placeholderText="Password"
				iconType="lock"
				secureTextEntry={true}
			/>

			<FormButton buttonTitle="Sign In" onPress={handleSubmit} />

			<TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
				<Text style={styles.navButtonText}>Forgot Password?</Text>
			</TouchableOpacity>

			{Platform.OS === "android" ? (
				<View>
					<SocialButton
						buttonTitle="Sign In with Facebook"
						btnType="facebook"
						color="#4867aa"
						backgroundColor="#e6eaf4"
						onPress={() => fbLogin()}
					/>

					<SocialButton
						buttonTitle="Sign In with Google"
						btnType="google"
						color="#de4d41"
						backgroundColor="#f5e7ea"
						onPress={() => googleLogin()}
					/>
				</View>
			) : null}

			<TouchableOpacity
				style={styles.forgotButton}
				onPress={() => navigation.navigate("Home")}
			>
				<Text style={styles.navButtonText}>
					Don't have an acount? Create here
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#f9fafd",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	logo: {
		height: 150,
		width: 150,
		resizeMode: "cover",
	},
	text: {
		fontFamily: "Kufam-SemiBoldItalic",
		fontSize: 28,
		marginBottom: 10,
		color: "#051d5f",
	},
	navButton: {
		marginTop: 15,
	},
	forgotButton: {
		marginVertical: 35,
	},
	navButtonText: {
		fontSize: 18,
		fontWeight: "500",
		color: "#2e64e5",
		fontFamily: "Lato-Regular",
	},
});