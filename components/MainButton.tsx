import ArrowIcon from "@/icons/ArrowIcon";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MainButtonProps {
  text?: string;
  title?: string;
  onPress?: () => void;
}

export default function MainButton({ text, title, onPress }: MainButtonProps) {
  const buttonText = text || title || "";

  return (
    <TouchableOpacity
      onPress={onPress}
      // Removed style from TouchableOpacity, it will be handled by the shadowContainer
    >
      <View
        style={[
          styles.shadowContainer, // Apply shadow styles here
          {
            width:
              buttonText === "Sign In" ||
              buttonText === "Sign Up" ||
              buttonText === "Sign Up inside tsx" ||
              buttonText === "Get OTP"
                ? "100%"
                : buttonText === "Get Started"
                ? 189
                : 153,
            backgroundColor: buttonText === "Sign Up" ? "white" : "transparent",
          },
        ]}
      >
        <LinearGradient
          colors={
            buttonText === "Sign Up"
              ? ["transparent", "transparent"]
              : ["#4960F9", "#1433FF"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.button, // This style will no longer have shadow properties
            {
              justifyContent:
                buttonText === "Get Started" || buttonText === "Get OTP"
                  ? "center"
                  : "space-between",
              width: "100%", // LinearGradient fills the shadowContainer
              paddingHorizontal:
                buttonText === "Sign In" ||
                buttonText === "Sign Up" ||
                buttonText === "Sign Up inside tsx" ||
                buttonText === "Get OTP"
                  ? 24
                  : 24,
              paddingVertical:
                buttonText === "Sign In" ||
                buttonText === "Sign Up" ||
                buttonText === "Sign Up inside tsx" ||
                buttonText === "Get OTP"
                  ? 24
                  : 20,
            },
          ]}
        >
          {/* First nested gradient */}
          <LinearGradient
            colors={["#5264F9", "#3AF9EF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={
              buttonText === "Sign Up"
                ? styles.thirdGradient
                : styles.firstGradient
            }
          />

          {/* Second/Fourth nested gradient (on top) */}
          <LinearGradient
            colors={
              buttonText === "Sign Up"
                ? ["rgba(199, 47, 248, 0.58)", "rgba(47, 86, 248, 0.71)"]
                : ["#C72FF8", "rgba(198, 48, 248, 0)"]
            }
            start={buttonText === "Sign Up" ? { x: 1, y: 0 } : { x: 0, y: 0 }}
            end={buttonText === "Sign Up" ? { x: 0, y: 1 } : { x: 1, y: 1 }}
            style={
              buttonText === "Sign Up"
                ? styles.fourthGradient
                : styles.secondGradient
            }
          />

          {/* Mirrored gradients for Get OTP variant */}
          {buttonText === "Get OTP" && (
            <>
              {/* Mirrored first gradient (left side) */}
              <LinearGradient
                colors={["#5264F9", "#3AF9EF"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.mirroredFirstGradient}
              />

              {/* Mirrored second gradient (left side) */}
              <LinearGradient
                colors={["#C72FF8", "rgba(198, 48, 248, 0)"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.mirroredSecondGradient}
              />
            </>
          )}

          {/* Border view for Sign Up variant */}
          {buttonText === "Sign Up" && <View style={styles.borderView} />}

          <Text
            style={[
              styles.text,
              { color: buttonText === "Sign Up" ? "#556BFF" : "#fff" },
            ]}
          >
            {buttonText === "Sign Up inside tsx" ? "Sign Up" : buttonText}
          </Text>
          {buttonText !== "Get Started" && buttonText !== "Get OTP" && (
            <ArrowIcon
              width={19}
              height={14}
              color={buttonText === "Sign Up" ? "#556BFF" : "#fff"}
            />
          )}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: "#1B39FF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8, // For Android shadow
    borderRadius: 28, // Match button's border radius for the shadow shape
    // backgroundColor: 'white', // Add if shadow behaves unexpectedly on some backgrounds
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden", // Ensure nested gradients are clipped
  },
  firstGradient: {
    position: "absolute",
    width: 142,
    height: 142,
    top: -125,
    right: -35,
    borderRadius: 160,
    transform: [{ rotate: "13.4deg" }],
  },
  secondGradient: {
    position: "absolute",
    width: 136,
    height: 136,
    top: -110,
    right: -75,
    borderRadius: 160,
    transform: [{ rotate: "-138.37deg" }],
  },
  thirdGradient: {
    position: "absolute",
    width: 142,
    height: 142,
    bottom: -125,
    right: -45,
    borderRadius: 160,
    transform: [{ rotate: "-75.23deg" }],
  },
  fourthGradient: {
    position: "absolute",
    width: 136,
    height: 136,
    bottom: -100,
    right: -90,
    borderRadius: 160,
    transform: [{ rotate: "-125.61deg" }],
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 20, // 100% of fontSize
    letterSpacing: 0,
    color: "#fff",
  },
  mirroredFirstGradient: {
    position: "absolute",
    width: 142,
    height: 142,
    top: -125,
    left: -35,
    borderRadius: 160,
    transform: [{ rotate: "-13.4deg" }],
  },
  mirroredSecondGradient: {
    position: "absolute",
    width: 136,
    height: 136,
    top: -110,
    left: -75,
    borderRadius: 160,
    transform: [{ rotate: "138.37deg" }],
  },
  borderView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#556BFF",
  },
});
