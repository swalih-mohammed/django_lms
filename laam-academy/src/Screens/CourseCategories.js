import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Card, Paragraph, Title, Button, Divider } from "react-native-paper";
import { COLORS, SIZES } from "../Helpers/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, ActivityIndicator, Modal, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import * as actions from "../store/actions/user";
import { localhost } from "../Helpers/urls";
import CourseCategory from "../Components/course/courseCategoryItem";

const CourseCategories = (props) => {
  const navigation = useNavigation();
  const [courseCategories, setCourseCategories] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log("st id", props.student_id);
    const source = axios.CancelToken.source();
    const getCourseCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${localhost}/courses/course-categories/`,
          { cancelToken: source.token }
        );
        setCourseCategories(response.data);
        // console.log(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(error)) {
          console.log("axios cancel error");
        } else {
          console.log("error occured in catch");
          console.log(err);
        }
      }
    };
    getCourseCategories();
    return () => {
      console.log("course categories page unmounting");
      source.cancel();
    };
  }, []);

  return (
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
          <Paragraph style={{ color: loading ? COLORS.primary : COLORS.white }}>
            Loading...
          </Paragraph>
          <ActivityIndicator
            size="large"
            animating={true}
            color={loading ? COLORS.primary : COLORS.white}
          />
        </View>
      ) : courseCategories ? (
        <ScrollView>
          <View
            style={{
              flex: 1,
              marginTop: 50,
              marginBottom: 10,
              marginVertical: 10,
              zIndex: 100,
              //   backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {courseCategories?.map((item, index) => {
              return <CourseCategory key={index} item={item} />;
            })}
          </View>
        </ScrollView>
      ) : null}
    </Animated.View>
  );
};

const mapStateToProps = (state) => {
  return {
    student_id: state.user.user.id,
    loading: state.user.loading,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentCourse: (student_id, course_id) =>
      dispatch(actions.updateCurrentCourse(student_id, course_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseCategories);
