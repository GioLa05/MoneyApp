import React from "react";
import { Text, TouchableOpacity } from "react-native";
import CustomCheckbox from "../icons/CustomCheckbox";

type Props = {
  disabled?: boolean;
  onPress?: () => void;
};

const WhiteButton = ({ disabled = false, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={{
        backgroundColor: "#FFFFFF",
        width: "100%",
        padding: 24,
        borderRadius: 28,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        shadowColor: "#1B39FF33",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 8,
      }}
    >
      <Text
        style={{
          color: disabled ? "#C8C8C8" : "#2743FD",
          fontSize: 20,
          fontFamily: "Montserrat",
          fontWeight: "400",
          lineHeight: 20,
          letterSpacing: 0,
          textAlign: "center",
        }}
      >
        Complete
      </Text>
      <CustomCheckbox disabled={disabled} />
    </TouchableOpacity>
  );
};

export default WhiteButton;
