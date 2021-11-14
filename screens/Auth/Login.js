import React, { useState } from "react";
import { StyleSheet, Image, TextInput, View, Text } from "react-native";
import * as Yup from "yup";

import Screen from "../../components/Screen";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../../components/forms";
import AppText from "../../components/Text";
import authApi from "../../api/auth";
import useAuth from "../../auth/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("E-mail cím megadása kötelező")
    .email("Helytelen e-mail formátum")
    .label("Email"),
  password: Yup.string()
    .required("Jelszó megadása kötelező")
    .min(1)
    .label("Password"),
});

const Login = () => {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (result.data.status !== 200) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data.result[0].token);
  };
  const handleEmail = (val) => setEmail(val);

  return (
    <Screen style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/logo-red.png")}
      />

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Helytelen e-mail vagy jelszó!"
          visible={loginFailed}
        />
        <View style={styles.inputView}>
          {/* <Text style={styles.title}>E-mail cím</Text> */}
          <TextInput
            style={styles.input}
            placeholderTextColor="#666666"
            placeholder="E-mail cím"
            // multiline={true}
            onChangeText={(val) => handleEmail(val)}
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            textContentType="emailAddress"
          />
          {emailError && (
            <AppText style={{ color: "red" }}>Helytelen e-mail cím!</AppText>
          )}
        </View>
        {/* <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        /> */}
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Jelszó"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Bejelentkezés" />
      </Form>
    </Screen>
  );
};

const styles = StyleSheet.create({
  inputView: { marginVertical: 5 },
  title: {
    fontFamily: "PoppinsRegular",
    marginVertical: 8,
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#E6E6E6",
    padding: 10,
    paddingTop: 10,
    fontFamily: "PoppinsLight",
    borderColor: "#C1C1C1",
  },
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default Login;
