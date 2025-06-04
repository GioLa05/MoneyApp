import MainButton from "@/components/MainButton";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 25,
  },
  logo: {
    width: 71,
    height: 69,
    resizeMode: "contain",
  },
  imageContainer: {
    paddingTop: 80,
    alignItems: "center",
  },
  onboardingImage: {
    width: 280,
    height: 280,
    resizeMode: "contain",
  },
  backgroundCircle: {
    width: 470,
    height: 470,
    borderRadius: 470,
    left: -133,
    bottom: -103,
    position: "absolute",
    backgroundColor: "#F5F6FA",
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  textContainer: {
    paddingTop: 25,
    paddingHorizontal: 30,
    display: "flex",
    flexDirection: "column",
    gap: 25,
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontWeight: "700",
    fontSize: 25,
    lineHeight: 36,
    letterSpacing: 0,
    color: "#2743FD",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0,
    color: "#7C2AFF",
    flexWrap: "wrap",
  },
  bottomContainer: {
    paddingHorizontal: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dotsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    height: 5,
    borderRadius: 6,
  },
});

export default function Index() {
  const screenWidth = Dimensions.get("window").width;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const dotAnim1 = useRef(new Animated.Value(22)).current;
  const dotAnim2 = useRef(new Animated.Value(5)).current;
  const dotAnim3 = useRef(new Animated.Value(5)).current;

  const handleNextClick = () => {
    // If on the last slide, navigate to welcome page
    if (currentSlide === 2) {
      router.push("/welcome");
      return;
    }

    // Start fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      // Change slide content
      if (currentSlide === 0) {
        setCurrentSlide(1);
      } else if (currentSlide === 1) {
        setCurrentSlide(2);
      }

      // Start fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }).start();
    });

    // Animate pagination dots based on current slide
    if (currentSlide === 0) {
      // Moving from first to second slide
      Animated.parallel([
        Animated.timing(dotAnim1, {
          toValue: 5,
          duration: 400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(dotAnim2, {
          toValue: 22,
          duration: 400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ]).start();
    } else if (currentSlide === 1) {
      // Moving from second to third slide
      Animated.parallel([
        Animated.timing(dotAnim2, {
          toValue: 5,
          duration: 400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(dotAnim3, {
          toValue: 22,
          duration: 400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/images/OnboardingLogo.png")}
            style={styles.logo}
          />

          <Animated.View
            style={[
              styles.imageContainer,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Image
              source={
                currentSlide === 0
                  ? require("../assets/images/OnboardingImg1.png")
                  : currentSlide === 1
                  ? require("../assets/images/OnboardingImg2.png")
                  : require("../assets/images/OnboardingImg3.png")
              }
              style={styles.onboardingImage}
            />
          </Animated.View>
        </View>
      </View>
      <View style={styles.backgroundCircle}></View>
      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.title}>
            {currentSlide === 0
              ? "Save your money conveniently."
              : currentSlide === 1
              ? "Secure your money for free and get rewards."
              : "Enjoy commission-free stock trading."}
          </Text>
          <Text style={[styles.subtitle, { maxWidth: screenWidth * 0.7 }]}>
            {currentSlide === 0
              ? "Get 5% cash back for each transaction and spend it easily."
              : currentSlide === 1
              ? "Get the most secure payment app ever and enjoy it."
              : "Online investing has never been easier than it is right now."}
          </Text>
        </Animated.View>
        <View style={styles.bottomContainer}>
          <View style={styles.dotsContainer}>
            <Animated.View
              style={[
                styles.dot,
                {
                  width: dotAnim1,
                  backgroundColor: currentSlide === 0 ? "#2A46FF" : "#B5BFFF",
                },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                {
                  width: dotAnim2,
                  backgroundColor: currentSlide === 1 ? "#2A46FF" : "#B5BFFF",
                },
              ]}
            />
            <Animated.View
              style={[
                styles.dot,
                {
                  width: dotAnim3,
                  backgroundColor: currentSlide === 2 ? "#2A46FF" : "#B5BFFF",
                },
              ]}
            />
          </View>
          <MainButton
            text={currentSlide === 2 ? "Get Started" : "Next"}
            onPress={handleNextClick}
          />
        </View>
      </View>
    </View>
  );
}
