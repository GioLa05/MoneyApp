import MainButton from "@/components/MainButton";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <LinearGradient
          colors={["rgba(198, 48, 248, 0.19)", "rgba(47, 86, 248, 0.71)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 580,
            height: 620,
            borderRadius: 300,
            position: "absolute",
            top: -137,
            left: -135,
          }}
        />
        <LinearGradient
          colors={["rgba(199, 47, 248, 0.58)", "rgba(47, 86, 248, 0.71)"]}
          start={{ x: 0.17, y: 0.83 }}
          end={{ x: 0.83, y: 0.17 }}
          style={{
            width: 580,
            height: 620,
            borderRadius: 300,
            position: "absolute",
            top: -213,
            left: -95,
          }}
        />
        <LinearGradient
          colors={["#5264F9", "#3AF9EF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 580,
            height: 620,
            borderRadius: 300,
            position: "absolute",
            top: -225,
            left: -230,
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 60,
          paddingTop: 55,
          gap: 20,
        }}
      >
        <Image
          source={require("@/assets/images/whiteLogo.png")}
          style={{ width: 80, height: 82, resizeMode: "contain" }}
        />
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "400",
            fontSize: 28,
            lineHeight: 28,
            letterSpacing: 0,
            textTransform: "capitalize",
            color: "#fff",
          }}
        >
          Welcome{"\n"}Back
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <MainButton text="Sign In" onPress={() => {}} />
        <MainButton text="Sign Up" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    width: "100%",
    paddingHorizontal: 30,
    paddingBottom: 75,
    gap: 15,
  },
});
