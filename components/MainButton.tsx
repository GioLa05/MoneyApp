import ArrowIcon from "@/icons/ArrowIcon";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MainButtonProps {
  text: string;
  onPress?: () => void;
}

export default function MainButton({ text, onPress }: MainButtonProps) {
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
              text === "Sign In" || text === "Sign Up"
                ? "100%"
                : text === "Get Started"
                ? 189
                : 153,
            backgroundColor: text === "Sign Up" ? "white" : "transparent",
          },
        ]}
      >
        <LinearGradient
          colors={
            text === "Sign Up"
              ? ["transparent", "transparent"]
              : ["#4960F9", "#1433FF"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.button, // This style will no longer have shadow properties
            {
              justifyContent:
                text === "Get Started" ? "center" : "space-between",
              width: "100%", // LinearGradient fills the shadowContainer
            },
          ]}
        >
          {/* First nested gradient */}
          <LinearGradient
            colors={["#5264F9", "#3AF9EF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={
              text === "Sign Up" ? styles.thirdGradient : styles.firstGradient
            }
          />

          {/* Second/Fourth nested gradient (on top) */}
          <LinearGradient
            colors={
              text === "Sign Up"
                ? ["rgba(199, 47, 248, 0.58)", "rgba(47, 86, 248, 0.71)"]
                : ["#C72FF8", "rgba(198, 48, 248, 0)"]
            }
            start={text === "Sign Up" ? { x: 1, y: 0 } : { x: 0, y: 0 }}
            end={text === "Sign Up" ? { x: 0, y: 1 } : { x: 1, y: 1 }}
            style={
              text === "Sign Up" ? styles.fourthGradient : styles.secondGradient
            }
          />

          {/* Border view for Sign Up variant */}
          {text === "Sign Up" && <View style={styles.borderView} />}

          <Text
            style={[
              styles.text,
              { color: text === "Sign Up" ? "#556BFF" : "#fff" },
            ]}
          >
            {text}
          </Text>
          {text !== "Get Started" && (
            <ArrowIcon
              width={19}
              height={14}
              color={text === "Sign Up" ? "#556BFF" : "#fff"}
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
