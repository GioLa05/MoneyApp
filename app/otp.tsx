import MainButton from "@/components/MainButton";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const OTP = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  // Animation values for sliding content
  const translateY = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(0)).current;

  // Animation to slide content up when input is focused
  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY, {
        toValue: -250, // Move button extra 100px higher than content
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animation to slide content back when input loses focus
  const slideDown = () => {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Function to dismiss keyboard and slide down content
  const dismissKeyboard = () => {
    Keyboard.dismiss();
    slideDown();
  };

  const handlePhoneNumberChange = (text: string) => {
    // Only allow numbers, spaces, and + symbol
    const filteredText = text.replace(/[^0-9+\s]/g, "");

    // Check if it's trying to exceed the maximum length for +995XXXXXX format
    // Remove spaces to count actual digits
    const digitsOnly = filteredText.replace(/\s/g, "");

    // If it starts with +995 and has more than 9 total characters (+995 + 6 digits), don't allow it
    // But we need to account for spaces in the display, so let's be more flexible
    if (digitsOnly.startsWith("+995") && digitsOnly.length > 10) {
      return; // Don't update state, effectively blocking further input
    }

    // Also check the total length including spaces to prevent extremely long input
    if (filteredText.length > 16) { // +995 XX XX XX = 12 chars, give more buffer
      return;
    }

    setPhoneNumber(filteredText);

    // Check if the phone number matches complete formats
    const phoneFormats = [
      /^\+995\d{6}$/, // +995XXXXXX (9 digits total)
      /^\+995 \d{3} \d{3}$/, // +995 XXX XXX
      /^\+995 \d{6}$/, // +995 XXXXXX
      /^\+995 \d{2} \d{2} \d{2}$/, // +995 XX XX XX
    ];

    const isComplete = phoneFormats.some((format) => format.test(filteredText));

    if (isComplete) {
      textInputRef.current?.blur();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>
        <Animated.View style={{ transform: [{ translateY }] }}>
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
              {otpSent 
                ? `Enter the OTP sent to ${phoneNumber}`
                : "We will send you a one-time password to this mobile number."
              }
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
                onFocus={slideUp}
                onBlur={slideDown}
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
        </Animated.View>

        {/* Spacer to push button to bottom */}
        <View style={{ flex: 1 }} />

        {/* Button at bottom with padding */}
        <Animated.View
          style={[
            {
              paddingHorizontal: "10%",
              paddingBottom: 75,
            },
            { transform: [{ translateY: buttonTranslateY }] },
          ]}
        >
          <MainButton
            title={otpSent ? "Verify" : "Get OTP"}
            onPress={() => {
              if (!otpSent) {
                // Handle OTP sending logic
                setOtpSent(true);
              } else {
                // Handle OTP verification logic
                console.log("Verifying OTP...");
              }
            }}
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OTP;
