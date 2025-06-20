import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const DrawerMenu = ({ isVisible, onClose }: Props) => {
  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 999,
          }}
        />
      </TouchableWithoutFeedback>

      {/* Drawer Content */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "80%",
          height: "100%",
          backgroundColor: "#FFFFFF",
          zIndex: 1000,
          paddingTop: 60,
          paddingHorizontal: 30,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        {/* User Profile Section */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <Image
            source={require("../assets/images/profilePicture.png")}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 15,
            }}
          />
          <View>
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: 18,
                color: "#000000",
              }}
            >
              Shasha Kolakola
            </Text>
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: "400",
                fontSize: 14,
                color: "#3A3A3A",
              }}
            >
              @chyaber02
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ flex: 1 }}>
          <MenuItems />
        </View>

        {/* Sign Out Button */}
        <View style={{ marginBottom: 50 }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "#2B47FC",
              borderRadius: 25,
              paddingVertical: 15,
              paddingHorizontal: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: "500",
                fontSize: 16,
                color: "#2B47FC",
                marginRight: 10,
              }}
            >
              Sign Out
            </Text>
            <Image
              source={require("../assets/images/rightArrow.png")}
              style={{
                width: 7,
                height: 12,
                tintColor: "#2B47FC",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const MenuItems = () => {
  const menuItems = [
    { icon: "💳", title: "Payments", color: "#2B47FC" },
    { icon: "💸", title: "Transactions", color: "#2B47FC" },
    { icon: "🏦", title: "My Cards", color: "#2B47FC" },
    { icon: "🎁", title: "Promotions", color: "#2B47FC" },
    { icon: "💰", title: "Savings", color: "#2B47FC" },
  ];

  return (
    <View>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 20,
            borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
            borderBottomColor: "#F0F0F0",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginRight: 15 }}>{item.icon}</Text>
            <Text
              style={{
                fontFamily: "Inter",
                fontWeight: "500",
                fontSize: 16,
                color: item.color,
              }}
            >
              {item.title}
            </Text>
          </View>
          <Image
            source={require("../assets/images/rightArrow.png")}
            style={{
              width: 7,
              height: 12,
              tintColor: item.color,
            }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DrawerMenu;
