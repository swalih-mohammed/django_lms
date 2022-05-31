import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Card, ProgressBar, Paragraph, Title, Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../../Helpers/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { LightSpeedInRight } from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as actions from "../../store/actions/course";
import { getUser } from "../../store/actions/user";
import { getCourse } from "../../store/actions/course";
import UnitItem from "../unit/item";
import Certificate from "./certificate";
import EnrollNowBar from "../Utils/enrollNowbar";

const CourseDetail = (props) => {
  console.log("is teacher", props.is_teacher);
  const navigation = useNavigation();
  const { course, loading, error } = props;
  const [enrollBar, setEnrollBar] = useState(false);

  useEffect(() => {
    redirect();
    setTimeout(makeEnrollVisible, 10000);
    return () => {
      clearTimeout(makeEnrollVisible);
    };
  }, []);

  const makeEnrollVisible = () => {
    if (course) {
      const NumberOfUnits = course.units ? course.units.length : 0;
      if (!course.is_enrolled && NumberOfUnits > 0) {
        console.log("im visible");
        setEnrollBar(true);
      }
    }
  };

  function redirect() {
    if (!props.token) {
      navigation.navigate("Get Started");
    } else {
      props.getUser(props.user_id);
      props.getCourse(props.user_id);
    }
  }

  const progress = () => {
    // console.log(course);
    if (course) {
      return course.completed_units + "/" + course.total_units;
    } else {
      return "00/00";
    }
  };

  const progressCalc = () => {
    let progress = 0;
    if (course) {
      progress = course.completed_units / course.total_units;
    } else {
      return progress;
    }
    if (isNaN(progress)) {
      return progress;
    }
    return progress;
  };
  // const url = `https://wa.me/7207724191/?text=Please%20help%20me%20to%20join%20the%20course%20${course.language}%20${course.title}`;
  const NumberOfUnits = course && course.units ? course.units.length : 0;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <ScrollView>
        <Animated.View
          entering={LightSpeedInRight}
          style={{ flex: 1, justifyContent: "center", marginBottom: 20 }}
        >
          {loading ? (
            <View
              style={{
                zIndex: -1,
                // flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 35,
                // backgroundColor: "red",
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
          ) : course ? (
            <View
              style={{
                zIndex: 100,
                // flex: 1,
              }}
            >
              <Card
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginHorizontal: 10,
                  height: 160,
                  borderRadius: 8,
                  backgroundColor: "#e9d985",
                  paddingHorizontal: 10,
                  marginHorizontal: 15,
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1.5 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <View
                        style={{
                          flex: 4,
                          // backgroundColor: "green",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          // onPress={() => setModalVisible(true)}
                          style={{
                            width: SIZES.width - 150,
                            height: 50,
                            borderRadius: 5,
                            marginTop: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#293241",
                            flexDirection: "row",
                          }}
                        >
                          <Title
                            style={{
                              // fontSize: 20,
                              fontWeight: "600",
                              color: "#ffffff",
                              paddingHorizontal: 25,
                              paddingVertical: 6,
                              borderRadius: 12,
                            }}
                          >
                            {course.title}
                          </Title>
                          <View
                            style={{
                              width: 35,
                              height: 35,
                              borderRadius: 35 / 2,
                              backgroundColor: "white",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: 10,
                              // flex: 1
                            }}
                          >
                            <MaterialCommunityIcons
                              name="school"
                              style={{
                                color: COLORS.primary,
                                fontSize: 30,
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Paragraph>{course.description}</Paragraph>
                  </View>

                  <View style={{ flex: 0.6 }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        marginHorizontal: 10,
                      }}
                    >
                      <View
                        style={{
                          flex: 5,
                          // backgroundColor: "green",
                          justifyContent: "center",
                        }}
                      >
                        <ProgressBar
                          progress={progressCalc()}
                          color={COLORS.primary}
                        />
                      </View>

                      <View
                        style={{
                          flex: 1,
                          // backgroundColor: "red",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Paragraph>{progress()}</Paragraph>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>

              {NumberOfUnits > 0 && (
                <View>
                  {course.units.map((item, index) => {
                    return (
                      <UnitItem key={index} item={item} loading={loading} />
                    );
                  })}
                </View>
              )}

              {NumberOfUnits < 1 && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 30,
                    paddingVertical: 50,
                    // backgroundColor: "red",
                  }}
                >
                  <Paragraph style={{ fontWeight: "bold", paddingBottom: 10 }}>
                    This course is not yet ready!
                  </Paragraph>
                  <Paragraph>
                    Go to account and change course or level to find a diffrent
                    course
                  </Paragraph>
                </View>
              )}
              {NumberOfUnits > 1 && (
                <View
                  style={{
                    // backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      minWidth: 50,
                      marginHorizontal: 20,
                      marginVertical: 20,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Certificate
                      student={props.username}
                      name={course.title}
                      certificate={course.certificate}
                      progress={course.completed_units / course.total_units}
                    />
                  </View>
                </View>
              )}
            </View>
          ) : null}
        </Animated.View>
      </ScrollView>
      {/* <Text>{enrollBar ? "yes" : "NO"}</Text> */}
      {!loading && course && enrollBar && (
        <EnrollNowBar fee={course.course_fee} discount={course.discount} />
      )}
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCourse: (user_id) => dispatch(getCourse(user_id)),
    getUser: (id) => dispatch(getUser(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user_id: state.auth.id,
    is_teacher: state.auth.is_teacher,
    course: state.course.course,
    is_enrolled: state.course.course.is_enrolled,
    loading: state.course.loading,
    error: state.course.error,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail);
