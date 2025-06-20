import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Text, View } from "react-native";

const homepage = () => {
  return (
    <View
      style={{
        backgroundColor: "#F9F9F9",
        flex: 1,
      }}
    >
      <Image
        source={require("../assets/images/whiteBurgerMenu.png")}
        style={{
          width: 28,
          height: 30,
          position: "absolute",
          top: 70,
          left: 30,
          resizeMode: "contain",
          zIndex: 1,
        }}
      />
      <Image
        source={require("../assets/images/profilePicture.png")}
        style={{
          width: 50,
          height: 50,
          position: "absolute",
          top: 70,
          right: 30,
          resizeMode: "contain",
          zIndex: 1,
        }}
      />
      <LinearGradient
        colors={["#4950F9", "#1937FE"]}
        style={{
          width: "100%",
          height: 278,
          borderBottomLeftRadius: 65,
          borderBottomRightRadius: 65,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontFamily: "Montserrat",
            fontWeight: "400",
            fontSize: 32,
            lineHeight: 32,
            letterSpacing: 0,
            paddingTop: 120,
            paddingHorizontal: 50,
          }}
        >
          Good morning Emma,
        </Text>
      </LinearGradient>
      <View
        style={{
          padding: 33,
          marginHorizontal: 40,
          marginTop: -30,
          marginBottom: 30,
          backgroundColor: "#FFFFFF",
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 9 },
          shadowOpacity: 0.1,
          shadowRadius: 30,
          elevation: 15,
          borderRadius: 40,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 16,
              letterSpacing: 0,
              color: "#000000",
            }}
          >
            Your total balance
          </Text>
          <Text
            style={{
              fontFamily: "SF Pro Rounded",
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 16,
              letterSpacing: 0,
              color: "#3A3A3A",
            }}
          >
            ...
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "700",
            fontSize: 30,
            lineHeight: 30,
            letterSpacing: 0,
            color: "#2D99FF",
          }}
        >
          $850.00
        </Text>
        <Image
          source={require("../assets/images/Columns.png")}
          style={{
            width: "100%",
            height: 166,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            paddingTop: 18,
          }}
        />
      </View>
    <LinearGradient
      colors={["#6075FF", "#1433FF"]}
      style={{
        padding: 24,
        borderRadius: 40,
        marginHorizontal: 40,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
        .
    <Text
      style={{
      fontFamily: "Montserrat",
      fontWeight: "400",
      fontSize: 18,
      lineHeight: 20,
      letterSpacing: 0,
      color: "#ffffff",
      }}
    >
      Check Your{"\n"}Bank Accounts
    </Text>
    </LinearGradient>
    </View>
  );
};

export default homepage;
