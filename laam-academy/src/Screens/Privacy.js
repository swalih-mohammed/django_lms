import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Header from "../Components/Utils/Header";
import Button from "../Components/Utils/Button";
import axios from "axios";
import { localhost } from "../Helpers/urls";
import { useNavigation } from "@react-navigation/native";
import { Paragraph, Title } from "react-native-paper";

const Privacy = () => {
  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <Title>Privacy Policy</Title>
        <Paragraph>
          Your privacy is important to us. It is Lakaters' policy to respect
          your privacy and comply with any applicable law and regulation
          regarding any personal information we may collect about you, including
          this app and our sites, www.laamacademy.com and https://lakaters.in/,
          and other sites we own and operate. This policy is effective as of 2
          November 2022 and was last updated on 2 June 2022.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>Information We Collect</Paragraph>
        <Paragraph>
          Information we collect includes both information you knowingly and
          actively provide us when using or participating in any of our services
          and promotions, and any information automatically sent by your devices
          in the course of accessing our products and services.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>Log Data</Paragraph>
        <Paragraph>
          When you visit our website, our servers may automatically log the
          standard data provided by your web browser. It may include your
          device’s Internet Protocol (IP) address, your browser type and
          version, the pages you visit, the time and date of your visit, the
          time spent on each page, other details about your visit, and technical
          details that occur in conjunction with any errors you may encounter.
          Please be aware that while this information may not be personally
          identifying by itself, it may be possible to combine it with other
          data to personally identify individual persons.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>Personal Information</Paragraph>
        <Paragraph>
          We may ask for personal information which may include one or more of
          the following: Name and Email
        </Paragraph>
        <Paragraph style={styles.SubTitle}>
          Legitimate Reasons for Processing Your Personal Information
        </Paragraph>
        <Paragraph>
          We only collect and use your personal information when we have a
          legitimate reason for doing so. In which instance, we only collect
          personal information that is reasonably necessary to provide our
          services to you.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>
          Collection and Use of Information
        </Paragraph>
        <Paragraph>
          We may collect personal information from you when you do any of the
          following on our website: Use a mobile device or web browser to access
          our content Contact us via email, social media, or on any similar
          technologies When you mention us on social media We may collect, hold,
          use, and disclose information for the following purposes, and personal
          information will not be further processed in a manner that is
          incompatible with these purposes: We may collect, hold, use, and
          disclose information for the following purposes, and personal
          information will not be further processed in a manner that is
          incompatible with these purposes: to enable you to customise or
          personalise your experience of our website to enable you to access and
          use our website, associated applications, and associated social media
          platforms Please be aware that we may combine information we collect
          about you with general information or research data we receive from
          other trusted sources.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>
          Security of Your Personal Information
        </Paragraph>
        <Paragraph>
          When we collect and process personal information, and while we retain
          this information, we will protect it within commercially acceptable
          means to prevent loss and theft, as well as unauthorized access,
          disclosure, copying, use, or modification. Although we will do our
          best to protect the personal information you provide to us, we advise
          that no method of electronic transmission or storage is 100% secure,
          and no one can guarantee absolute data security. We will comply with
          laws applicable to us in respect of any data breach. You are
          responsible for selecting any password and its overall security
          strength, ensuring the security of your own information within the
          bounds of our services.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>
          How Long We Keep Your Personal Information
        </Paragraph>
        <Paragraph>
          We keep your personal information only for as long as we need to. This
          time period may depend on what we are using your information for, in
          accordance with this privacy policy. If your personal information is
          no longer required, we will delete it or make it anonymous by removing
          all details that identify you. However, if necessary, we may retain
          your personal information for our compliance with a legal, accounting,
          or reporting obligation or for archiving purposes in the public
          interest, scientific, or historical research purposes or statistical
          purposes.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>
          International Transfers of Personal Information
        </Paragraph>
        <Paragraph>
          The personal information we collect is stored and/or processed where
          we or our partners, affiliates, and third-party providers maintain
          facilities. Please be aware that the locations to which we store,
          process, or transfer your personal information may not have the same
          data protection laws as the country in which you initially provided
          the information. If we transfer your personal information to third
          parties in other countries: (i) we will perform those transfers in
          accordance with the requirements of applicable law; and (ii) we will
          protect the transferred personal information in accordance with this
          privacy policy.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>
          Your Rights and Controlling Your Personal Information
        </Paragraph>
        <Paragraph>
          You always retain the right to withhold personal information from us,
          with the understanding that your experience of our website may be
          affected. We will not discriminate against you for exercising any of
          your rights over your personal information. If you do provide us with
          personal information you understand that we will collect, hold, use
          and disclose it in accordance with this privacy policy. You retain the
          right to request details of any personal information we hold about
          you. If we receive personal information about you from a third party,
          we will protect it as set out in this privacy policy. If you are a
          third party providing personal information about somebody else, you
          represent and warrant that you have such person’s consent to provide
          the personal information to us. If you have previously agreed to us
          using your personal information for direct marketing purposes, you may
          change your mind at any time. We will provide you with the ability to
          unsubscribe from our email-database or opt out of communications.
          Please be aware we may need to request specific information from you
          to help us confirm your identity. If you believe that any information
          we hold about you is inaccurate, out of date, incomplete, irrelevant,
          or misleading, please contact us using the details provided in this
          privacy policy. We will take reasonable steps to correct any
          information found to be inaccurate, incomplete, misleading, or out of
          date. If you believe that we have breached a relevant data protection
          law and wish to make a complaint, please contact us using the details
          below and provide us with full details of the alleged breach. We will
          promptly investigate your complaint and respond to you, in writing,
          setting out the outcome of our investigation and the steps we will
          take to deal with your complaint. You also have the right to contact a
          regulatory body or data protection authority in relation to your
          complaint.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>Use of Cookies</Paragraph>
        <Paragraph>
          We use “cookies” to collect information about you and your activity
          across our site. A cookie is a small piece of data that our website
          stores on your computer, and accesses each time you visit, so we can
          understand how you use our site. This helps us serve you content based
          on preferences you have specified.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>Limits of Our Policy</Paragraph>
        <Paragraph>
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and policies
          of those sites, and cannot accept responsibility or liability for
          their respective privacy practices.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>Changes to This Policy</Paragraph>
        <Paragraph>
          At our discretion, we may change our privacy policy to reflect updates
          to our business processes, current acceptable practices, or
          legislative or regulatory changes. If we decide to change this privacy
          policy, we will post the changes here at the same link by which you
          are accessing this privacy policy. If required by law, we will get
          your permission or give you the opportunity to opt in to or opt out
          of, as applicable, any new uses of your personal information.
        </Paragraph>
        <Paragraph style={styles.SubTitle}>Contact Us</Paragraph>
        <Paragraph>
          For any questions or concerns regarding your privacy, you may contact
          us using the following details:
        </Paragraph>
        <Paragraph>Laam Academy</Paragraph>
        <Paragraph>support@laamacademy.com</Paragraph>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  SubTitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 20,
    // textTransform: "uppercase",
  },
});

export default Privacy;
