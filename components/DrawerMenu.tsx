import { router, usePathname } from "expo-router";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import WhiteButton from "./WhiteButton";

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
            paddingHorizontal: 30,
          }}
        >
          <Image
            source={require("../assets/images/profilePicture.png")}
            style={{
              width: 60,
              height: 60,
              borderRadius: 0,
              marginRight: 15,
            }}
          />
          <View>
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "700",
                fontSize: 16,
                color: "#000000",
              }}
            >
              Shasha Kolakola
            </Text>
            <Text
              style={{
                fontFamily: "Montserrat",
                fontWeight: "400",
                fontSize: 15,
                color: "#000000",
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
        <View
          style={{
            paddingBottom: 80,
            paddingHorizontal: 30,
          }}
        >
          <WhiteButton
            title="Sign Out"
            onPress={() => {
              router.replace("/welcome");
            }}
          />
        </View>
      </View>
    </>
  );
};

const MenuItems = () => {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const pathname = usePathname();

  const menuItems = [
    {
      icon: require("../assets/images/paymentsIcon.png"),
      title: "Payments",
      color: "#2B47FC",
      iconWidth: 18,
      iconHeight: 18,
      route: "/(tabs)/homepage", // For now, navigate to homepage for payments
    },
    {
      icon: require("../assets/images/transactionsIcon.png"),
      title: "Transactions",
      color: "#2B47FC",
      iconWidth: 11,
      iconHeight: 15,
      route: "/transactions", // For now, navigate to transactions for transactions
    },
    {
      icon: require("../assets/images/myCardsIcon.png"),
      title: "My Cards",
      color: "#2B47FC",
      iconWidth: 25,
      iconHeight: 21,
      route: "/mycards", // For now, navigate to profile for cards
    },
    {
      icon: require("../assets/images/promotionsIcon.png"),
      title: "Promotions",
      color: "#2B47FC",
      iconWidth: 20,
      iconHeight: 20,
      route: "/(tabs)/homepage", // For now, navigate to homepage for promotions
    },
    {
      icon: require("../assets/images/savingsIcon.png"),
      title: "Savings",
      color: "#2B47FC",
      iconWidth: 18,
      iconHeight: 21,
      route: "/(tabs)/homepage", // For now, navigate to homepage for savings
    },
  ];

  return (
    <View>
      {menuItems.map((item, index) => {
        // Always show Payments as active, others based on route or selection
        const isActive =
          item.title === "Payments" ||
          pathname === item.route ||
          selectedIndex === index;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedIndex(index);
              if (item.route) {
                router.push(item.route as any);
              }
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 14,
              paddingHorizontal: 32,
              backgroundColor: isActive ? "#F2F4F8" : "transparent",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={item.icon}
                style={{
                  width: item.iconWidth,
                  height: item.iconHeight,
                  marginRight: 15,
                  tintColor: item.color,
                }}
              />
              <Text
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "400",
                  fontSize: 18,
                  lineHeight: 18,
                  letterSpacing: 0,
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
        );
      })}
    </View>
  );
};

export default DrawerMenu;
