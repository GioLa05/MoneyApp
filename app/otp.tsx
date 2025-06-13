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
  const [isInputFocused, setIsInputFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  // Animation values for sliding content
  const translateY = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(0)).current;

  // Animation to slide content up when input is focused
  const slideUp = () => {
    setIsInputFocused(true);
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
    setIsInputFocused(false);
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

    // Check if it's trying to exceed the maximum length for +995XXXXXXX format
    // Remove spaces to count actual digits
    const digitsOnly = filteredText.replace(/\s/g, "");

    // Allow +995 + up to 9 digits (Georgian mobile numbers can be 9 digits)
    // Increased limit to allow more flexibility
    if (digitsOnly.startsWith("+995") && digitsOnly.length > 13) {
      return; // Don't update state, effectively blocking further input
    }

    // Also check the total length including spaces to prevent extremely long input
    if (filteredText.length > 20) { // Increased buffer for more flexibility
      return;
    }

    setPhoneNumber(filteredText);

    // Only auto-blur if it's a clearly complete format (9 digits after +995)
    // Use setTimeout to avoid interfering with the input during typing
    // Only auto-blur if the input is actually focused and user has stopped typing
    if (isInputFocused && digitsOnly.startsWith("+995") && digitsOnly.length === 12) {
      setTimeout(() => {
        if (textInputRef.current?.isFocused()) {
          textInputRef.current?.blur();
        }
      }, 500); // Increased delay to give user time to continue typing
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
              paddingHorizontal: otpSent ? 60 : 70,
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
