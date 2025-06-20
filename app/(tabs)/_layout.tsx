import { Tabs } from "expo-router";
import React, { createContext, useCallback, useState } from "react";
import { Animated, View } from "react-native";

import DrawerMenu from "../../components/DrawerMenu";
import Bell from "../../icons/Bell";
import User from "../../icons/User";
import Wallet from "../../icons/Wallet";

// Create a context for drawer state
export const DrawerContext = createContext<{
  openDrawer: () => void;
  closeDrawer: () => void;
} | null>(null);

export default function TabLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const closeDrawer = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsDrawerOpen(false);
    });
  }, [slideAnim]);

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer }}>
      <View style={{ flex: 1 }}>
        {/* Drawer Menu with Animation */}
        {isDrawerOpen && (
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              transform: [
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-310, 0],
                  }),
                },
              ],
            }}
          >
            <DrawerMenu isVisible={isDrawerOpen} onClose={closeDrawer} />
          </Animated.View>
        )}

        {/* Main Content with Slide Animation */}
        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 310], // Move content 350px to the right
                }),
              },
            ],
          }}
        >
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#FFFFFF",
                borderTopWidth: 0,
                height: 90,
                paddingBottom: 25,
                paddingTop: 15,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 10,
              },
              tabBarActiveTintColor: "#2B47FC",
              tabBarInactiveTintColor: "#3A3A3A",
              tabBarShowLabel: false,
            }}
          >
            <Tabs.Screen
              name="homepage"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Wallet stroke={color} />
                    {focused && (
                      <View
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "#2B47FC",
                          marginTop: 4,
                        }}
                      />
                    )}
                  </View>
                ),
              }}
            />
            <Tabs.Screen
              name="notifications"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Bell stroke={color} />
                    {focused && (
                      <View
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "#2B47FC",
                          marginTop: 4,
                        }}
                      />
                    )}
                  </View>
                ),
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <User stroke={color} />
                    {focused && (
                      <View
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "#2B47FC",
                          marginTop: 4,
                        }}
                      />
                    )}
                  </View>
                ),
              }}
            />
          </Tabs>
        </Animated.View>
      </View>
    </DrawerContext.Provider>
  );
}
