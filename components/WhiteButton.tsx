import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import CustomCheckbox from "../icons/CustomCheckbox";

type Props = {
  disabled?: boolean;
  onPress?: () => void;
  title?: string;
};

const WhiteButton = ({
  disabled = false,
  onPress,
  title = "Complete",
}: Props) => {
  const isSignOut = title === "Sign Out";

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={{
        backgroundColor: "#FFFFFF",
        width: "100%",
        paddingHorizontal: isSignOut ? 24 : 24,
        paddingVertical: isSignOut ? 20 : 24,
        borderRadius: 28,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: isSignOut ? "space-between" : "center",
        gap: 10,
        ...(isSignOut
          ? {
              borderWidth: 1,
              borderColor: "#556BFF",
            }
          : {
              shadowColor: "#1B39FF33",
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 1,
              shadowRadius: 16,
              elevation: 8,
            }),
      }}
    >
      <Text
        style={{
          color: isSignOut ? "#556BFF" : disabled ? "#C8C8C8" : "#2743FD",
          fontSize: isSignOut ? 18 : 20,
          fontFamily: "Montserrat",
          fontWeight: "400",
          lineHeight: isSignOut ? 18 : 20,
          letterSpacing: 0,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      {isSignOut && (
        <Image
          source={require("../assets/images/signOutButton.png")}
          style={{
            width: 21,
            height: 20,
          }}
        />
      )}
      {!isSignOut && <CustomCheckbox disabled={disabled} />}
    </TouchableOpacity>
  );
};

export default WhiteButton;
