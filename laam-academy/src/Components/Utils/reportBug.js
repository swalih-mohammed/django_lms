import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Animated, { BounceInDown } from "react-native-reanimated";
import { Button, Card, Paragraph, TextInput, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SIZES } from "../../Helpers/constants";
import { localhost } from "../../Helpers/urls";

const ReportBug = ({ user, course, unit, quiz, conversation, text }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(false);

  const reportBug = async () => {
    try {
      setLoading(true);
      const data = {
        user: user,
        course: course,
        unit: unit,
        quiz: quiz,
        conversation: conversation,
        message: text + message,
      };
      console.log("submitting", data);
      const response = await axios.post(`${localhost}/bugs/report-bug/`, data);
      if (response.status === 201) {
        setSubmitted(true);
      } else {
        setError(true);
      }
      console.log(response.status === 201);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const CloseModal = () => {
    setMessage("");
    setModalVisible(false);
    setSubmitted(false);
  };

  return (
    <View style={{ position: "absolute", top: 15, right: 15, zIndex: 10 }}>
      <MaterialCommunityIcons
        onPress={() => setModalVisible(true)}
        name="flag"
        style={{
          color: "red",
          fontSize: 30,
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 10,
        }}
      />
      {modalVisible && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // height: 200,
            backgroundColor: "red",
          }}
        >
          <Modal transparent={true}>
            <Animated.View
              entering={BounceInDown}
              style={{
                backgroundColor: "#edeec9",
                justifyContent: "space-around",
                flex: 1,
                marginHorizontal: 20,
                marginVertical: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  position: "absolute",
                  top: 20,
                  right: 20,
                  zIndex: 10,
                }}
                onPress={() => setModalVisible(false)}
              >
                <View
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 20 / 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="close"
                    style={{
                      color: COLORS.enactive,
                      fontSize: 35,
                    }}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  height: 30,
                  alignItems: "center",
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Paragraph style={{ color: "black", fontWeight: "bold" }}>
                  {submitted ? "Thanks!" : " Report a problem!"}
                </Paragraph>
              </View>

              <View
                style={{
                  paddingHorizontal: 15,
                  marginBottom: 20,
                  justifyContent: "center",
                }}
              >
                {submitted ? (
                  <TouchableOpacity
                    onPress={() => CloseModal()}
                    style={{
                      width: SIZES.width - 150,
                      height: 80,
                      borderRadius: 5,
                      marginTop: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#293241",
                      alignSelf: "center",
                      // flexDirection: "row",
                    }}
                  >
                    <Paragraph
                      style={{
                        fontWeight: "600",
                        color: "#ffffff",
                        paddingHorizontal: 25,
                        paddingVertical: 6,
                        borderRadius: 12,
                      }}
                    >
                      Your feedback is submitted
                    </Paragraph>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TextInput
                      label="type the issue"
                      value={message}
                      onChangeText={(message) => setMessage(message)}
                      multiline
                    />
                    <Button
                      onPress={reportBug}
                      style={{ marginTop: 10 }}
                      mode="outlined"
                    >
                      Submit
                    </Button>
                  </>
                )}
              </View>
            </Animated.View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.id,
    course: state.course.course.id,
  };
};
export default connect(mapStateToProps, null)(ReportBug);
