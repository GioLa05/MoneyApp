import ArrowIcon from "@/icons/ArrowIcon";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface MainButtonProps {
  text: string;
  onPress?: () => void;
}

export default function MainButton({ text, onPress }: MainButtonProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#4960F9", "#1433FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.button,
          {
            justifyContent: text === "Get Started" ? "center" : "space-between",
            width: text === "Get Started" ? 189 : 153,
          },
        ]}
      >
        {/* First nested gradient */}
        <LinearGradient
          colors={["#5264F9", "#3AF9EF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.firstGradient}
        />

        {/* Second nested gradient (on top) */}
        <LinearGradient
          colors={["#C72FF8", "rgba(198, 48, 248, 0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.secondGradient}
        />

        <Text style={styles.text}>{text}</Text>
        {text !== "Get Started" && (
          <ArrowIcon width={19} height={14} color="#fff" />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#1B39FF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8, // For Android shadow
    overflow: "hidden", // Ensure nested gradients are clipped
  },
  firstGradient: {
    position: "absolute",
    width: 142,
    height: 142,
    top: -125,
    right: -60,
    borderRadius: 160,
    transform: [{ rotate: "13.4deg" }],
  },
  secondGradient: {
    position: "absolute",
    width: 136,
    height: 136,
    top: -100,
    right: -95,
    borderRadius: 160,
    transform: [{ rotate: "-138.37deg" }],
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    fontWeight: "400",
    fontSize: 20,
    lineHeight: 20, // 100% of fontSize
    letterSpacing: 0,
    color: "#fff",
  },
});
