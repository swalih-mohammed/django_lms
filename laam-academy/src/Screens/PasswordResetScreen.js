import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { localhost } from "../Helpers/urls";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Header from "../Components/Utils/Header";
import Button from "../Components/Utils/Button";
import TextInput from "../Components/Utils/TextInput";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { LightSpeedInRight } from "react-native-reanimated";
import { COLORS, SIZES } from "../Helpers/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "../Components/Utils/Utilities";

import * as actions from "../store/actions/auth";
import { Card, Paragraph } from "react-native-paper";

const SignUpScreen = (props) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState({ value: "", error: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const resetPassword = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
    } else {
      resetPasswordHandle(email.value);
    }
  };

  const resetPasswordHandle = (user_email) => {
    setLoading(true);
    axios
      .post(`${localhost}/dj-rest-auth/password/reset/`, {
        email: user_email,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setMessage("Password reset email has been sent to your email");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error in password change", err);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      {loading ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>loading...</Text>
          <ActivityIndicator animating={true} color={COLORS.primary} />
        </View>
      ) : (
        <Animated.View entering={LightSpeedInRight} style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Account")}
            style={{
              zIndex: 100,
              alignSelf: "flex-start",
              top: 15,
              left: 15,
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
              position: "absolute",
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              style={{
                color: "black",
                fontSize: 30,
              }}
            />
          </TouchableOpacity>

          <Card
            style={{
              width: SIZES.width * 0.9,
              //   height: error ? SIZES.height * 0.75 : SIZES.height * 0.65,
              paddingHorizontal: 25,
              paddingHorizontal: 15,
              justifyContent: "center",
              marginVertical: 20,
              paddingVertical: 20,
              // alignItems: "center",
            }}
          >
            {error && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text style={{ alignSelf: "center", color: COLORS.error }}>
                  An error occured, please check if your email.
                </Text>
              </View>
            )}

            <Header>Reset Password</Header>

            {!loading && !message && (
              <>
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
                />

                <Button mode="contained" onPress={resetPassword}>
                  Reset Password
                </Button>
              </>
            )}
            {!loading && message && (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                }}
                mode="contained"
                onPress={() => navigation.navigate("Get Started")}
              >
                <Paragraph> {message}</Paragraph>
              </TouchableOpacity>
            )}
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
    loading: state.auth.loading,
    error: state.auth.error,
    message: state.auth.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // changePassword: (password1, password2, oldPass, token) =>
    //   dispatch(actions.changePassword(password1, password2, oldPass, token)),
    logOut: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
