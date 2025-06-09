import MainButton from "@/components/MainButton";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  StyleSheet,
  View,
  ViewToken,
} from "react-native";
import { Text } from "react-native-gesture-handler";

interface OnboardingItem {
  id: number;
  title: string;
  subtitle: string;
  image: any;
}

const onboardingData: OnboardingItem[] = [
  {
    id: 0,
    title: "Save your money conveniently.",
    subtitle: "Get 5% cash back for each transaction and spend it easily.",
    image: require("../assets/images/OnboardingImg1.png"),
  },
  {
    id: 1,
    title: "Secure your money for free and get rewards.",
    subtitle: "Get the most secure payment app ever and enjoy it.",
    image: require("../assets/images/OnboardingImg2.png"),
  },
  {
    id: 2,
    title: "Enjoy commission-free stock trading.",
    subtitle: "Online investing has never been easier than it is right now.",
    image: require("../assets/images/OnboardingImg3.png"),
  },
];

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
  flatListContainer: {
    flex: 1,
  },
  slideContainer: {
    width: Dimensions.get("window").width,
    alignItems: "center",
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
  const flatListRef = useRef<FlatList>(null);

  // Animation values
  const textOpacity = useRef(new Animated.Value(1)).current;
  const dotAnim1 = useRef(new Animated.Value(22)).current;
  const dotAnim2 = useRef(new Animated.Value(5)).current;
  const dotAnim3 = useRef(new Animated.Value(5)).current;

  const handleNextClick = () => {
    // If on the last slide, navigate to welcome page
    if (currentSlide === 2) {
      router.push("/welcome");
      return;
    }

    const nextSlide = currentSlide + 1;

    // Fade out text, then scroll and fade in
    Animated.timing(textOpacity, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      // Scroll to next slide
      flatListRef.current?.scrollToIndex({
        index: nextSlide,
        animated: true,
      });

      // Fade in new text
      setTimeout(() => {
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        }).start();
      }, 100);
    });
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index || 0;

        if (newIndex !== currentSlide) {
          // Fade out current text
          Animated.timing(textOpacity, {
            toValue: 0,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
          }).start(() => {
            setCurrentSlide(newIndex);

            // Fade in new text
            Animated.timing(textOpacity, {
              toValue: 1,
              duration: 200,
              easing: Easing.ease,
              useNativeDriver: true,
            }).start();
          });
        }

        // Animate pagination dots based on current slide
        if (newIndex === 0) {
          Animated.parallel([
            Animated.timing(dotAnim1, {
              toValue: 22,
              duration: 400,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: false,
            }),
            Animated.timing(dotAnim2, {
              toValue: 5,
              duration: 400,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: false,
            }),
            Animated.timing(dotAnim3, {
              toValue: 5,
              duration: 400,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: false,
            }),
          ]).start();
        } else if (newIndex === 1) {
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
            Animated.timing(dotAnim3, {
              toValue: 5,
              duration: 400,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: false,
            }),
          ]).start();
        } else if (newIndex === 2) {
          Animated.parallel([
            Animated.timing(dotAnim1, {
              toValue: 5,
              duration: 400,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: false,
            }),
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
      }
    }
  ).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderSlide = ({ item }: { item: OnboardingItem }) => (
    <View style={styles.slideContainer}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.onboardingImage} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/OnboardingLogo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

      <View style={styles.backgroundCircle}></View>

      <View style={styles.contentContainer}>
        <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
          <Text style={styles.title}>
            {onboardingData[currentSlide]?.title}
          </Text>
          <Text style={[styles.subtitle, { maxWidth: screenWidth * 0.7 }]}>
            {onboardingData[currentSlide]?.subtitle}
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
