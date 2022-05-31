import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Paragraph } from "react-native-paper";
import { COLORS, SIZES } from "../../Helpers/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import * as actions from "../../store/actions/courseList";
import CourseListItem from "./courseListItem";

// const ITEM_WIDTH = SIZES.width * 0.4;
// const ITEM_HEIGHT = ITEM_WIDTH * 2;

const CourseList = (props) => {
  console.log("test");
  const navigation = useNavigation();
  const { courses, loading, error } = props;

  useEffect(() => {
    console.log(props.current_course_id);
    props.getCourseList(props.user_id);
  }, []);

  const containerStyle = {
    // backgroundColor: "red",
    // flex: 1,
    flexGrow: 1,
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={containerStyle}>
        <Animated.View
          exiting={SlideOutRight.duration(500)}
          entering={SlideInRight.duration(500)}
          style={{ flex: 1 }}
        >
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

          {loading ? (
            <View
              style={{
                zIndex: -1,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignItems: "center",
                // backgroundColor: "green",
              }}
            >
              <Paragraph
                style={{ color: loading ? COLORS.primary : COLORS.white }}
              >
                Loading...
              </Paragraph>
              <ActivityIndicator
                size="large"
                animating={true}
                color={loading ? COLORS.primary : COLORS.white}
              />
            </View>
          ) : courses.length > 0 ? (
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                paddingTop: 50,
                zIndex: 100,
                justifyContent: "center",
              }}
            >
              {courses?.map((item, index) => {
                return (
                  <CourseListItem key={index} item={item} loading={loading} />
                );
              })}
            </View>
          ) : null}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCourseList: (username) => dispatch(actions.getCourseList(username)),
  };
};

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.id,
    current_course_id: state.user.user.current_course_id,
    courses: state.courseList.courseList,
    loading: state.courseList.loading,
    error: state.courseList.error,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
