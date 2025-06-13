import MainButton from "@/components/MainButton";
import { router } from "expo-router";
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
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  const textInputRef = useRef<TextInput>(null);
  const otpInputRefs = useRef<(TextInput | null)[]>([]);

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
    // Only slide down if not in OTP mode
    if (!otpSent) {
      slideDown();
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    // Only allow single digit
    const digit = text.replace(/[^0-9]/g, "").slice(-1);

    const newOtpCode = [...otpCode];
    newOtpCode[index] = digit;
    setOtpCode(newOtpCode);

    // Auto-focus next input if digit is entered
    if (digit && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace to go to previous input
    if (e.nativeEvent.key === "Backspace" && !otpCode[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
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
    if (filteredText.length > 20) {
      // Increased buffer for more flexibility
      return;
    }

    setPhoneNumber(filteredText);

    // Only auto-blur if it's a clearly complete format (9 digits after +995)
    // Use setTimeout to avoid interfering with the input during typing
    // Only auto-blur if the input is actually focused and user has stopped typing
    if (
      isInputFocused &&
      digitsOnly.startsWith("+995") &&
      digitsOnly.length === 12
    ) {
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
        {!otpSent ? (
          // Phone Number Input Mode
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
              {/* Phone Number Input */}
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
                <View
                  style={{
                    width: "60%",
                    borderWidth: 1,
                    borderColor: "#2743FD",
                    alignSelf: "center",
                  }}
                ></View>
              </View>
            </View>
          </Animated.View>
        ) : (
          // OTP Input Mode - No Animation
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
                paddingHorizontal: 60,
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
                {`Enter the OTP sent to ${phoneNumber}`}
              </Text>
            </View>
            <View
              style={{
                paddingTop: 28,
              }}
            >
              {/* OTP Input Boxes */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 20,
                    paddingHorizontal: 40,
                  }}
                >
                  {[0, 1, 2, 3].map((index) => (
                    <View key={index} style={{ flex: 1, maxWidth: 60 }}>
                      <TextInput
                        ref={(ref) => {
                          otpInputRefs.current[index] = ref;
                        }}
                        value={otpCode[index]}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        style={{
                          fontFamily: "Inter",
                          fontWeight: "700",
                          fontSize: 24,
                          lineHeight: 24,
                          textAlign: "center",
                          color: "#3A3A3A",
                          paddingBottom: 12,
                          backgroundColor: "transparent",
                        }}
                      />
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: otpCode[index] ? "#2743FD" : "#E0E0E0",
                        }}
                      ></View>
                    </View>
                  ))}
                </View>

                {/* Resend OTP Text */}
                <View style={{ paddingTop: 40 }}>
                  <Text
                    style={{
                      fontFamily: "Inter",
                      fontWeight: "400",
                      fontSize: 14,
                      lineHeight: 14,
                      textAlign: "center",
                      color: "#B9B9B9",
                    }}
                  >
                    Didn&apos;t you receive the OTP?{" "}
                    <Text
                      style={{
                        color: "#2743FD",
                        fontWeight: "600",
                      }}
                      onPress={() => {
                        // Handle resend OTP
                        console.log("Resend OTP");
                      }}
                    >
                      Resend OTP
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

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
            title={otpSent ? "Verify" : "Get OTP"}
            disabled={otpSent && !otpCode.every((digit) => digit !== "")}
            onPress={() => {
              if (!otpSent) {
                // Handle OTP sending logic
                setOtpSent(true);
              } else {
                // Handle OTP verification logic
                Keyboard.dismiss();
                console.log("Verifying OTP...");
                // Use dismissTo to navigate back to a specific screen
                router.dismissTo("/homepage");
              }
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OTP;
