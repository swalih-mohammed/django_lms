import React from "react";
import { connect } from "react-redux";
import { View, Image, TouchableOpacity } from "react-native";
import { Paragraph, Card, Button, Divider, Title } from "react-native-paper";
import { COLORS, SIZES } from "../../Helpers/constants";
import * as actions from "../../store/actions/user";
import * as courseActions from "../../store/actions/course";
import { useNavigation } from "@react-navigation/native";

const CourseCategory = (props) => {
  const navigation = useNavigation();
  const level = 1;
  const updateCurrentCourse = () => {
    props.updateCurrentCourse(
      props.user_id,
      props.student_id,
      props.item.id,
      level
    );
    props.getCourse(props.user_id);
    navigation.navigate("Account");
  };
  return (
    <Card style={{ height: 120, width: 300, marginVertical: 10 }}>
      <Card.Content>
        <Title>{props.item.title}</Title>
        <Divider style={{ marginBottom: 10 }} />
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={updateCurrentCourse}
          // disabled={!props.item.is_active}
          style={{ width: 200, marginLeft: 20 }}
          mode="outlined"
        >
          {props.item.is_active ? "Change" : "Not Available now"}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user_id: state.auth.id,
    student_id: state.user.user.id,
    student: state.user.user,
    loading: state.user.loading,
    error: state.user.error,
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseCategory);
