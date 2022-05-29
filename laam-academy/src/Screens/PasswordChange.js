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
  const [password1, setPassword1] = useState({ value: "", error: "" });
  const [password2, setPassword2] = useState({ value: "", error: "" });
  const [oldPass, setOldPass] = useState({ value: "", error: "" });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // console.log(props.token);
    // if (props.token) {
    //   () => navigation.navigate("Home");
    // }
  }, []);

  const changePassword = () => {
    const token = props.token;
    const password1Error = passwordValidator(password1.value);
    const password2Error = passwordValidator(password2.value);
    const oldPassError = passwordValidator(oldPass.value);

    if (password1Error || password2Error || oldPassError) {
      setPassword1({ ...password1, error: password1Error });
      setPassword2({ ...password2, error: password2Error });
      setOldPass({ ...oldPass, error: oldPassError });
    } else {
      changePassworde(password1.value, password2.value, oldPass.value, token);
    }
  };

  const changePassworde = (password1, password2, oldPass, token) => {
    const authAxios = axios.create({
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = {
      new_password1: password1,
      new_password2: password2,
      old_password: oldPass,
    };
    setLoading(true);
    authAxios
      .post(`${localhost}/dj-rest-auth/password/change/`, data)
      .then((res) => {
        setMessage(res.data.detail);
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
              height: error ? SIZES.height * 0.75 : SIZES.height * 0.65,
              paddingHorizontal: 25,
              paddingHorizontal: 15,
              justifyContent: "center",
              alignItems: "center",
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
                  An error occured, please check your email and username
                </Text>
              </View>
            )}

            <Header>Change Password</Header>

            {!loading && !message && (
              <>
                <TextInput
                  label="Old password"
                  returnKeyType="next"
                  value={oldPass.value}
                  onChangeText={(text) =>
                    setOldPass({ value: text, error: "" })
                  }
                  error={!!oldPass.error}
                  errorText={oldPass.error}
                  secureTextEntry
                />
                <TextInput
                  label="New password"
                  returnKeyType="next"
                  value={password1.value}
                  onChangeText={(text) =>
                    setPassword1({ value: text, error: "" })
                  }
                  error={!!password1.error}
                  errorText={password1.error}
                  secureTextEntry
                />
                <TextInput
                  label="Confirm Password"
                  returnKeyType="done"
                  value={password2.value}
                  onChangeText={(text) =>
                    setPassword2({ value: text, error: "" })
                  }
                  error={!!password2.error}
                  errorText={password2.error}
                  secureTextEntry
                />

                <Button mode="contained" onPress={changePassword}>
                  Change
                </Button>
              </>
            )}
            {!loading && message && (
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                }}
                mode="contained"
                onPress={() => navigation.navigate("Account")}
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
    changePassword: (password1, password2, oldPass, token) =>
      dispatch(actions.changePassword(password1, password2, oldPass, token)),
    logOut: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
