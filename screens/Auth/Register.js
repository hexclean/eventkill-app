import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import usersApi from "../../api/users";
import authApi from "../../api/auth";
import useAuth from "../../auth/useAuth";
import {
	ErrorMessage,
	Form,
	FormField,
	SubmitButton,
} from "../../components/forms";
import useApi from "../../hooks/useApi";
import ActivityIndicator from "../../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
	name: Yup.string().required().min(2).label("Name"),
	company: Yup.string().required().min(1).label("Company"),
	email: Yup.string().required().email().label("Email"),
	password: Yup.string().required().min(6).label("Password"),
});

function RegisterScreen() {
	const [registerFailed, setRegisterFailed] = useState(false);
	const [loginFailed, setLoginFailed] = useState(false);
	const registerApi = useApi(usersApi.register);
	const loginApi = useApi(authApi.login);
	const auth = useAuth();
	const [error, setError] = useState();

	const handleSubmit = async userInfo => {
		const request = {
			name: userInfo.name,
			email: userInfo.email,
			password: userInfo.password,
			company: userInfo.company,
			deviceToken: "token",
		};
		const result = await registerApi.request(request);
		if (result.data.status !== 200) return setRegisterFailed(true);
		setRegisterFailed(false);

		const login = await authApi.login(userInfo.email, userInfo.password);
		if (login.data.status !== 200) return setLoginFailed(true);
		setLoginFailed(false);
		auth.logIn(login.data.result[0].token);
	};

	return (
		<>
			<ActivityIndicator visible={registerApi.loading || loginApi.loading} />
			<Screen style={styles.container}>
				<Form
					initialValues={{
						name: "",
						email: "",
						password: "",
						company: "",
					}}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					<ErrorMessage
						error="Az e-mail címmel már regisztráltak"
						visible={registerFailed}
					/>
					<ErrorMessage error="Login error" visible={loginFailed} />
					<FormField
						autoCorrect={false}
						icon="account"
						name="name"
						placeholder="Név"
					/>
					<FormField
						autoCorrect={false}
						icon="briefcase"
						name="company"
						placeholder="Cégnév"
					/>
					<FormField
						autoCapitalize="none"
						autoCorrect={false}
						icon="email"
						keyboardType="email-address"
						name="email"
						placeholder="E-mail"
						textContentType="emailAddress"
					/>
					<FormField
						autoCapitalize="none"
						autoCorrect={false}
						icon="lock"
						name="password"
						placeholder="Jelszó"
						secureTextEntry
						textContentType="password"
					/>
					<SubmitButton title="Regisztráció" />
				</Form>
			</Screen>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
});

export default RegisterScreen;
