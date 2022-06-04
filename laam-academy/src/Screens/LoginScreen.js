import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from "react-native";
// import Logo from "../Components/Utils/Logo";
import Header from "../Components/Utils/Header";
import TextInput from "../Components/Utils/TextInput";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../Helpers/constants";
import { Card, Paragraph } from "react-native-paper";
import Animated, { LightSpeedInRight } from "react-native-reanimated";
import { authLogin, authResetPassword, logout } from "../store/actions/auth";
import { getCourse } from "../store/actions/course";
import {
  emailValidator,
  passwordValidator,
} from "../Components/Utils/Utilities";
import { Button } from "react-native-paper";

const LoginScreen = (props) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  useEffect(() => {
    if (props.token) {
      navigation.navigate("Courses");
    }
  }, [props.token]);

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
    } else {
      props.authLogin(email.value, password.value);
      getCourse();
      redirect();
    }
  };

  const getCourse = () => {
    if (props.user_id) {
      console.log("getting course after login");
      props.getCourse(props.user_id);
    }
  };
  const redirect = () => {
    console.log("redirecting after login");
    if (props.token) {
      navigation.navigate("Courses");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      {props.loading || props.courseLoading ? (
        <View
          style={{
            zIndex: -1,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paragraph>Loading...</Paragraph>
          <ActivityIndicator
            size="large"
            animating={true}
            color={COLORS.primary}
          />
        </View>
      ) : (
        <Animated.View entering={LightSpeedInRight} style={styles.container}>
          {props.error && (
            <Card
              style={{
                width: SIZES.width * 0.9,
                height: 70,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text style={{ alignSelf: "center", color: COLORS.error }}>
                  An error occured, please retry to login
                </Text>
              </View>
            </Card>
          )}
          <Card
            style={{
              width: SIZES.width * 0.9,
              height: SIZES.height * 0.7,
              paddingHorizontal: 25,
              paddingHorizontal: 15,
            }}
          >
            <Header>Welcome back</Header>
            <TextInput
              label="Email"
              returnKeyType="next"
              value={email.value}
              onChangeText={(text) => setEmail({ value: text, error: "" })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              caretHidden={false}
              editable
            />
            <TextInput
              label="Password"
              returnKeyType="done"
              value={password.value}
              onChangeText={(text) => setPassword({ value: text, error: "" })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
            />
            {/* <View style={styles.forgotPassword}>
              <TouchableOpacity
                onPress={() => navigation.navigate("PasswordReset")}
              >
                <Text style={{ color: COLORS.primary }}>
                  Forgot your password?
                </Text>
              </TouchableOpacity>
            </View> */}
            <TouchableOpacity
              disabled={props.loading}
              style={{
                width: "100%",
                height: 42,
                borderRadius: 10,
                backgroundColor: COLORS.primary,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
              onPress={_onLoginPressed}
            >
              <Paragraph style={{ color: "black", fontWeight: "700" }}>
                LOGIN
              </Paragraph>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={props.loading}
              style={{
                width: "100%",
                height: 42,
                borderRadius: 10,
                backgroundColor: COLORS.white,
                justifyContent: "center",
                alignItems: "center",
                borderColor: COLORS.primary,
                borderWidth: 0.5,
              }}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Paragraph style={{ color: "black", fontWeight: "700" }}>
                SIGN UP
              </Paragraph>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                // backgroundColor: "red",
                alignSelf: "center",
                paddingTop: 40,
              }}
            >
              <Paragraph
                style={{ fontSize: 12, textAlign: "center", paddingBottom: 20 }}
              >
                By logging in, you are agreeing to the below privacy policy
              </Paragraph>
              <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
                <Text style={{ color: COLORS.primary }}>Privacy policy</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user_id: state.auth.id,
    user_email: state.auth.email,
    loading: state.auth.loading,
    courseLoading: state.course.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authLogin: (username, password) => dispatch(authLogin(username, password)),
    logOut: () => dispatch(logout()),
    getCourse: (user_id) => dispatch(getCourse(user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
