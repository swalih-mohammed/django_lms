import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import Dash from "react-native-dash";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SIZES } from "../../Helpers/constants";
import * as actions from "../../store/actions/user";
import * as courseActions from "../../store/actions/course";
import { useNavigation } from "@react-navigation/native";

const CourseFee = (props) => {
  const courseFeeNum = Number(props.course_fee);
  const discountNum = Number(props.discount);
  const discount = discountNum * 100;
  const AfterDiscount = courseFeeNum - courseFeeNum * discountNum;
  return (
    <View
      style={{
        backgroundColor: "#ffb703",
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 3,
        // width: 150,
      }}
    >
      {props.is_active ? (
        <Text style={{ justifyContent: "space-around" }}>
          <Paragraph style={{ textDecorationLine: "line-through" }}>
            {courseFeeNum}
          </Paragraph>
          <Paragraph>{"  " + discount + "%off  "}</Paragraph>
          <Paragraph>{AfterDiscount}</Paragraph>
        </Text>
      ) : (
        <Paragraph>{"Not available"}</Paragraph>
      )}
    </View>
  );
};

const CourseListItem = (props) => {
  const { item } = props;
  const navigation = useNavigation();
  // console.log("course list item");
  const updateCurrentLevel = (level) => {
    props.updateCurrentCourse(
      props.user_id,
      props.student_id,
      props.current_course_id,
      level
    );
    props.getCourse(props.user_id);
    navigation.navigate("Account");
  };

  const progress =
    item.completed_units === 0 || item.total_units === 0
      ? 0
      : item.completed_units / item.total_units;
  return (
    <View style={{ flex: 1, flexDirection: "row", height: 140 }}>
      <View style={{ flex: 1.5 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 30 / 2,
                backgroundColor: progress === 1 ? COLORS.primary : "white",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
                //   flex: 1,
              }}
            >
              <MaterialCommunityIcons
                name={progress === 1 ? "check" : "school"}
                style={{
                  color: progress === 1 ? "white" : COLORS.primary,
                  fontSize: progress === 1 ? 20 : 30,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 7,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Dash
              dashColor={progress === 1 ? COLORS.primary : COLORS.enactive}
              dashThickness={3}
              dashGap={3}
              style={{
                width: 1,
                height: 100,
                flexDirection: "column",
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 7,
          marginHorizontal: 20,
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Card
          style={{
            borderRadius: 15,
            // marginVertical: 10,
            marginRight: 15,
            marginBottom: 10,
            elevation: 10,
            flex: 1,
            // width: 250,
            borderColor: progress === 1 ? COLORS.primary : COLORS.white,
          }}
        >
          <View
            style={{
              // backgroundColor: "red",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flex: 1,
              paddingHorizontal: 15,
              paddingVertical: 10,
              position: "relative",
            }}
          >
            <Title style={{ fontSize: 14, fontWeight: "800" }}>
              {item.title}
            </Title>
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 25 / 2,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
                position: "absolute",
                right: 10,
                top: 10,
                // flex: 1
              }}
            >
              <MaterialCommunityIcons
                name={item.is_enrolled ? "lock-open-variant" : "lock"}
                style={{
                  color:
                    item.order > item.current_level
                      ? COLORS.enactive
                      : COLORS.primary,
                  fontSize: 15,
                }}
              />
            </View>
            <CourseFee
              is_active={item.is_active}
              course_fee={item.course_fee}
              discount={item.discount}
            />

            <Button
              mode={!item.is_enrolled ? "contained" : "outlined"}
              disabled={!item.is_active}
              onPress={() => updateCurrentLevel(item.order)}
              style={{
                marginTop: 10,
                width: 125,
                height: 35,
                borderRadius: 5,
                alignSelf: "flex-start",
                justifyContent: "space-evenly",
                alignItems: "center",
                // backgroundColor: "#293241",
                flexDirection: "row",
                // alignSelf: "center",
                paddingHorizontal: 5,
                // left: 0,
              }}
            >
              {item.is_enrolled ? "Explore" : "Enroll"}
            </Button>
          </View>
        </Card>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentCourse: (user_id, student_id, course_id, level) =>
      dispatch(
        actions.updateCurrentCourse(user_id, student_id, course_id, level)
      ),
    getCourse: (user_id) => dispatch(courseActions.getCourse(user_id)),
  };
};

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.id,
    student_id: state.user.user.id,
    current_course_id: state.user.user.current_course_id,
    loading: state.courseList.loading,
    error: state.courseList.error,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseListItem);
