import MainButton from "@/components/MainButton";
import React, { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const OTP = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const textInputRef = useRef<TextInput>(null);

  const handlePhoneNumberChange = (text: string) => {
    // Only allow numbers, spaces, and + symbol
    const filteredText = text.replace(/[^0-9+\s]/g, "");

    // Check if it's trying to exceed the maximum length for +995XXXXXX format
    // Remove spaces to count actual digits
    const digitsOnly = filteredText.replace(/\s/g, "");

    // If it starts with +995 and has more than 9 total characters (+995 + 6 digits), don't allow it
    if (digitsOnly.startsWith("+995") && digitsOnly.length > 9) {
      return; // Don't update state, effectively blocking further input
    }

    setPhoneNumber(filteredText);

    // Check if the phone number matches complete formats
    const phoneFormats = [
      /^\+995\d{6}$/, // +995XXXXXX (9 digits total)
      /^\+995 \d{3} \d{3}$/, // +995 XXX XXX
      /^\+995 \d{6}$/, // +995 XXXXXX
    ];

    const isComplete = phoneFormats.some((format) => format.test(filteredText));

    if (isComplete) {
      textInputRef.current?.blur();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
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
        <View
          style={{
            paddingTop: 28,
          }}
        >
          <View style={{ position: "relative" }}>
            {/* Placeholder text with opacity */}
            {phoneNumber === "" && (
              <Text
                style={{
                  position: "absolute",
                  fontFamily: "Inter",
                  fontWeight: "700",
                  fontSize: 14,
                  lineHeight: 14,
                  letterSpacing: 0,
                  textAlign: "center",
                  color: "#3A3A3A",
                  opacity: 0.6,
                  width: "100%",
                  paddingBottom: 8,
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              >
                +995 555 555 555
              </Text>
            )}
            <TextInput
              ref={textInputRef}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="phone-pad"
              placeholder=""
              style={{
                fontFamily: "Inter",
                fontWeight: "700",
                fontSize: 14,
                lineHeight: 14,
                letterSpacing: 0,
                textAlign: "center",
                color: "#3A3A3A",
                paddingBottom: 8,
                backgroundColor: "transparent",
              }}
            />
          </View>
          <View
            style={{
              width: "60%",
              borderWidth: 1,
              borderColor: "#2743FD",
              alignSelf: "center",
            }}
          ></View>
        </View>

        {/* Spacer to push button to bottom */}
        <View style={{ flex: 1 }} />

        {/* Button at bottom with padding */}
        <View
          style={{
            paddingHorizontal: "10%",
            paddingBottom: 75,
          }}
        >
          <MainButton
            title="Get OTP"
            onPress={() => {
              // Handle OTP sending logic
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OTP;
