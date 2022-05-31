import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Linking, Text } from "react-native";
import { SIZES, COLORS } from "../../Helpers/constants";
import { Card, Paragraph } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, { BounceInDown } from "react-native-reanimated";

const EnrollNowBar = (props) => {
  const courseFeeNum = Number(props.fee);
  const discountNum = Number(props.discount);
  const discount = discountNum * 100;
  const AfterDiscount = courseFeeNum - courseFeeNum * discountNum;
  return (
    <Animated.View entering={BounceInDown}>
      <Card
        style={{
          width: SIZES.width,
          height: 50,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#eeefa8",
          }}
        >
          <MaterialCommunityIcons
            name="whatsapp"
            style={{
              color: COLORS.primary,
              fontSize: 30,
            }}
          />

          {/* <CourseFee fee={props.fee} discount={props.discount}/> */}
          <View
            style={{
              backgroundColor: "#ffb703",
              paddingHorizontal: 5,
              paddingVertical: 3,
              borderRadius: 5,
              // width: 145,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ justifyContent: "space-around" }}>
              <Paragraph style={{ textDecorationLine: "line-through" }}>
                {courseFeeNum}
              </Paragraph>
              <Paragraph>{"  " + discount + "%off  "}</Paragraph>
              <Paragraph>{AfterDiscount}</Paragraph>
            </Text>
          </View>

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#293241",
              width: 100,
              height: 30,
              paddingHorizontal: 5,
              paddingVertical: 3,
              borderRadius: 5,
            }}
          >
            <Paragraph
              onPress={() => Linking.openURL(url)}
              style={{ color: "white" }}
            >
              Enroll today
            </Paragraph>
          </TouchableOpacity>
        </View>
      </Card>
    </Animated.View>
  );
};
export default EnrollNowBar;
