import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "email-address";
  isDateField?: boolean;
  onValueChange?: (value: string) => void;
};

const TextField = ({
  label,
  placeholder,
  keyboardType = "default",
  isDateField = false,
  onValueChange,
}: Props) => {
  const [value, setValue] = useState("");

  const formatDateInput = (text: string) => {
    // Remove all non-numeric characters
    const numericOnly = text.replace(/\D/g, "");

    // Limit to 8 digits (DDMMYYYY)
    const limitedText = numericOnly.slice(0, 8);

    // Add dashes at appropriate positions
    let formatted = limitedText;
    if (limitedText.length > 2) {
      formatted = limitedText.slice(0, 2) + "-" + limitedText.slice(2);
    }
    if (limitedText.length > 4) {
      formatted =
        limitedText.slice(0, 2) +
        "-" +
        limitedText.slice(2, 4) +
        "-" +
        limitedText.slice(4);
    }

    return formatted;
  };

  const handleTextChange = (text: string) => {
    if (isDateField) {
      const formattedText = formatDateInput(text);
      setValue(formattedText);
      onValueChange?.(formattedText);
    } else {
      setValue(text);
      onValueChange?.(text);
    }
  };

  return (
    <View
      style={{
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 1,
        width: "100%",
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            paddingBottom: 12,
            paddingLeft: 4,
          }}
        >
          <Text
            style={{
              color: "#80E0FF",
              fontSize: 14,
              fontFamily: "Inter",
              fontWeight: "400",
              lineHeight: 14,
              letterSpacing: 0,
            }}
          >
            {label}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={{
                color: "#ffffff",
                fontSize: 14,
                fontFamily: "Inter",
                fontWeight: "400",
                lineHeight: 20,
                letterSpacing: 0,
                flex: 1,
                paddingVertical: 4,
                minHeight: 24,
              }}
              placeholder={placeholder}
              placeholderTextColor="#80E0FF"
              value={value}
              onChangeText={handleTextChange}
              keyboardType={keyboardType}
              multiline={false}
            />
            {value.length > 0 && (
              <Image
                source={require("../assets/images/purpleCheckbox.png")}
                style={{
                  width: 18,
                  height: 13,
                  resizeMode: "contain",
                  marginLeft: 8,
                }}
              />
            )}
          </View>
        </View>
        <View></View>
      </View>
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {},
});
