import React from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  View,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { Card, Button, Paragraph, Title, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as authActions from "../store/actions/auth";
import * as courseListActions from "../store/actions/courseList";
import * as userActions from "../store/actions/user";
import { useFocusEffect } from "@react-navigation/native";
import Animated, { SlideInRight } from "react-native-reanimated";
import { COLORS, SIZES } from "../Helpers/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TestList from "../Components/tests/list";
import ReportBug from "../Components/Utils/reportBug";

const Account = (props) => {
  const navigation = useNavigation();
  // console.log(props.current_level);

  React.useEffect(() => {
    pushToHome();
    props.getUser(props.id);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log("usefocus firing ");
      pushToHome();
    }, [])
  );

  function pushToHome() {
    if (!props.token) {
      console.log("pusing to home ");
      navigation.navigate("Get Started");
    }
  }

  const logOut = () => {
    props.logOut();
    navigation.navigate("Get Started");
  };

  const url = `https://wa.me/7207724191/?text=Please%20help%20me%20to%20join%20the%20course%20`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Animated.View
          // entering={LightSpeedInRight}
          // exiting={SlideOutRight.duration(500)}
          entering={SlideInRight.duration(500)}
          style={{ flex: 1, paddingHorizontal: 25, paddingVertical: 20 }}
        >
          <Title style={{ paddingTop: 20, fontWeight: "bold" }}>
            Your Account Details
          </Title>
          <Text style={{ paddingBottom: 10 }}>Manage account settings</Text>
          <Paragraph style={styles.SubTitle}>Profile</Paragraph>
          <Divider />
          <View style={styles.Row}>
            <Paragraph>Name</Paragraph>
            <Paragraph>{props.name}</Paragraph>
          </View>
          <Divider />
          <View style={styles.Row}>
            <Paragraph>Email</Paragraph>
            <Paragraph>{props.email}</Paragraph>
          </View>
          <Divider />
          <View style={styles.Row}>
            <Paragraph>Change Password</Paragraph>
            <TouchableOpacity
              onPress={() => navigation.navigate("PasswordChange")}
            >
              <MaterialCommunityIcons
                name="chevron-right"
                style={{
                  color: COLORS.primary,
                  fontSize: 30,
                }}
              />
            </TouchableOpacity>
          </View>
          <Divider />

          <Paragraph style={styles.SubTitle}>Contact us</Paragraph>
          <Divider />
          <View style={styles.Row}>
            <Paragraph>Whatsapp</Paragraph>
            <TouchableOpacity onPress={() => Linking.openURL(url)}>
              <MaterialCommunityIcons
                name="whatsapp"
                style={{
                  color: COLORS.primary,
                  fontSize: 30,
                }}
              />
            </TouchableOpacity>
          </View>
          <Divider />
          <View style={styles.Row}>
            <Paragraph>Email</Paragraph>
            <TouchableOpacity
              onPress={() => Linking.openURL(`mailto:support@laamacademy.com`)}
              title="support@laamacademy.com"
            >
              <Paragraph style={{ color: COLORS.primary }}>
                support@laamacademy.com
              </Paragraph>
            </TouchableOpacity>
          </View>
          <Divider />
          <View style={styles.Row}>
            <Paragraph>Call</Paragraph>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${7207724191}`)}
            >
              <Paragraph>720-772-4191</Paragraph>
            </TouchableOpacity>
          </View>
          <Divider />

          <Paragraph style={styles.SubTitle}>Your Course</Paragraph>
          <Divider />
          <View style={styles.Row}>
            <Paragraph>Certificates</Paragraph>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{
                color: COLORS.primary,
                fontSize: 30,
              }}
            />
          </View>
          <Divider />
          <View style={styles.Row}>
            <Paragraph>Language</Paragraph>
            <Paragraph>{props.current_course}</Paragraph>
          </View>
          <Divider />
          <View style={styles.Row}>
            <Paragraph>Change Language</Paragraph>
            <TouchableOpacity
              onPress={() => navigation.navigate("CourseCategories")}
            >
              <MaterialCommunityIcons
                name="chevron-right"
                style={{
                  color: COLORS.primary,
                  fontSize: 30,
                }}
              />
            </TouchableOpacity>
          </View>
          <Divider />
          <View style={styles.Row}>
            <Paragraph>Level</Paragraph>

            <Paragraph style={{ paddingRight: 10 }}>
              {props.current_level}
            </Paragraph>
          </View>

          <View style={styles.Row}>
            <Paragraph>Change Level</Paragraph>
            {/* <Paragraph> {props.is_teacher ? "yes" : "no"}</Paragraph> */}

            <TouchableOpacity
              onPress={() => navigation.navigate("CourseLevelList")}
            >
              <MaterialCommunityIcons
                name="chevron-right"
                style={{
                  color: COLORS.primary,
                  fontSize: 30,
                }}
              />
            </TouchableOpacity>
          </View>
          <Divider />
          <View style={styles.Row}>
            <Paragraph style={styles.SubTitle}>Test Your English</Paragraph>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{
                color: COLORS.primary,
                fontSize: 30,
              }}
            />
          </View>
          <Divider />
          {props.is_teacher ? (
            <>
              <View style={styles.Row}>
                <Paragraph>Report a problem</Paragraph>
                <ReportBug />
              </View>
              <Divider />
            </>
          ) : null}

          <View style={styles.Row}>
            <Paragraph>Privacy policy</Paragraph>
            {/* <Paragraph> {props.is_teacher ? "yes" : "no"}</Paragraph> */}
            <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{
                  color: COLORS.primary,
                  fontSize: 30,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.Row}>
            <Button
              style={{ height: 40, width: 100, marginVertical: 20 }}
              mode="outlined"
              onPress={logOut}
            >
              Log out
            </Button>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 55,
  },

  SubTitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 20,
    textTransform: "uppercase",
  },
});

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    id: state.auth.id,
    email: state.auth.email,
    name: state.auth.name,
    is_teacher: state.auth.is_teacher,
    current_course: state.user.user.current_course_language,
    current_level: state.user.user.current_course_level,
    student_id: state.user.user.id,
    courseList: state.courseList.courseList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(authActions.logout()),
    getCourseList: (id) => dispatch(courseListActions.getCourseList(id)),
    getUser: (id) => dispatch(userActions.getUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
