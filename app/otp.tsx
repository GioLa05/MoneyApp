import React from "react";
import { Image, Text, View } from "react-native";

const otp = () => {
  return (
    <View>
      <View
        style={{
          paddingTop: 100,
          paddingBottom: 50,
        }}
      >
        <Image
          source={require("../assets/images/otpPhoto.png")}
          style={{
            width: 260,
            height: 270,
            resizeMode: "contain",
            alignSelf: "center",
          }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 28, // Only works on RN 0.71+. For older RN, use marginBottom
          paddingHorizontal: 70,
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 28,
            lineHeight: 28,
            letterSpacing: 0,
            textAlign: "center",
            textTransform: "capitalize",
            color: "#3A3A3A",
          }}
        >
          OTP Verification
        </Text>
        <Text
          style={{
            fontFamily: "Inter",
            fontWeight: "400",
            fontSize: 14,
            lineHeight: 14, // 100% of 14
            letterSpacing: 0,
            textAlign: "center",
            color: "#3A3A3A",
          }}
        >
          We will send you a one-time password to this mobile number.
        </Text>
        <Text
          style={{
            fontFamily: "Inter",
            fontWeight: "400",
            fontSize: 14,
            lineHeight: 14,
            letterSpacing: 0,
            textAlign: "center",
            textTransform: "capitalize",
            color: "#B9B9B9",
          }}
        >
          Enter mobile number
        </Text>
      </View>
    </View>
  );
};

export default otp;
