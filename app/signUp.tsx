import MainButton from "@/components/MainButton";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Provider as PaperProvider,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // Define ref with correct typing for TextInput
  const passwordInputRef = useRef<any>(null);

  // Animation values for sliding content and background
  const translateY = useRef(new Animated.Value(0)).current;
  const backgroundTranslateY = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(0)).current;

  // Validate email format
  const validateEmail = (text: string) => {
    const isValid = /\S+@\S+\.\S+/.test(text);
    setEmailError(!isValid);
    return isValid;
  };

  // Validate password
  const validatePassword = (text: string) => {
    const hasSpecialChar = /[!@*]/.test(text);
    const isValid = text.length >= 6 && hasSpecialChar;
    setPasswordError(!isValid);
    return isValid;
  };

  // Animation to slide content up when input is focused
  const slideUp = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundTranslateY, {
        toValue: -150, // Move background up too, but less than content
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY, {
        toValue: -150, // Move button up by 150px
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animation to slide content back when input loses focus
  const slideDown = () => {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSignUp = async () => {
    // Validate inputs first
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      setIsLoading(true);

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Sign up with:", email, password);
      setSnackbarMessage("Sign up successful!");
      setSnackbarVisible(true);

      // Navigate after successful signup
      setTimeout(() => {
        router.push("/welcome");
      }, 1000);
    } catch {
      setSnackbarMessage("Sign up failed. Please try again.");
      setSnackbarVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to dismiss keyboard and slide down content
  const dismissKeyboard = () => {
    Keyboard.dismiss();
    slideDown();
  };

  return (
    <PaperProvider>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.outerContainer}>
          <Animated.Image
            source={require("../assets/images/circles.png")}
            style={[
              styles.backgroundImage,
              { transform: [{ translateY: backgroundTranslateY }] },
            ]}
          />

          <Animated.View
            style={[styles.animatedContainer, { transform: [{ translateY }] }]}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.contentContainer}>
                <Text style={styles.title}>Sign Up</Text>

                <View style={styles.formContainer}>
                  <TextInput
                    label="Email Address"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (email.length > 0) validateEmail(text);
                      else setEmailError(false);
                    }}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => {
                      setEmailError(false);
                      slideUp();
                    }}
                    onBlur={() => {
                      if (email.length > 0) validateEmail(email);
                    }}
                    onSubmitEditing={() => {
                      if (passwordInputRef.current) {
                        passwordInputRef.current.focus();
                      }
                    }}
                    blurOnSubmit={false} // Changed to false for smoother keyboard experience
                    returnKeyType="next" // Changed to next for better form navigation
                    error={emailError}
                    mode="flat"
                    underlineColor="#2743FD"
                    activeUnderlineColor="#2743FD"
                    underlineStyle={{ height: 1 }}
                    right={
                      email.length > 0 && !emailError ? (
                        <TextInput.Icon icon="check" color="#CB3EF9" />
                      ) : null
                    }
                  />
                  {emailError && (
                    <Text style={styles.errorText}>
                      The email address is incomplete.
                    </Text>
                  )}

                  <TextInput
                    label="Password"
                    value={password}
                    ref={passwordInputRef}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (password.length > 0) validatePassword(text);
                      else setPasswordError(false);
                    }}
                    secureTextEntry={secureTextEntry}
                    style={styles.input}
                    mode="flat"
                    underlineColor="#2743FD"
                    activeUnderlineColor="#2743FD"
                    underlineStyle={{ height: 1 }}
                    onFocus={() => {
                      setPasswordError(false);
                      slideUp();
                    }}
                    onBlur={() => {
                      if (password.length > 0) validatePassword(password);
                    }}
                    onSubmitEditing={() => {
                      handleSignUp();
                      dismissKeyboard();
                    }}
                    blurOnSubmit={true}
                    returnKeyType="done"
                    error={passwordError}
                    right={
                      <TextInput.Icon
                        icon={secureTextEntry ? "eye" : "eye-off"}
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                        color="#292929"
                      />
                    }
                  />
                  {passwordError && (
                    <Text style={styles.errorText}>
                      Must contain special characters - !, @, *
                    </Text>
                  )}

                  <Button
                    mode="text"
                    style={styles.forgotPassword}
                    labelStyle={{ color: "#2B47FC" }}
                    onPress={() => console.log("Forgot password")}
                  >
                    Forgot Password?
                  </Button>

                  {/* Add padding at bottom to ensure keyboard doesn't cover content */}
                  <View style={{ paddingBottom: 120 }} />
                </View>
              </View>
            </ScrollView>
            {/* Button container that moves with content */}
            <Animated.View
              style={[
                styles.bottomButtonContainer,
                { transform: [{ translateY: buttonTranslateY }] },
              ]}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color="#2743FD" />
              ) : (
                <MainButton text="Sign Up inside tsx" onPress={handleSignUp} />
              )}
            </Animated.View>
          </Animated.View>

          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000}
            style={styles.snackbar}
            action={{
              label: "OK",
              onPress: () => setSnackbarVisible(false),
            }}
          >
            {snackbarMessage}
          </Snackbar>
        </View>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  animatedContainer: {
    flex: 1,
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  backgroundImage: {
    width: 435,
    height: 400,
    resizeMode: "contain",
    position: "absolute",
    top: -100,
    left: -60,
    zIndex: 0, // Ensure background stays behind other elements
  },
  contentContainer: {
    paddingTop: 325,
    paddingHorizontal: 35,
    flex: 1,
  },
  title: {
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: 36,
    lineHeight: 36,
    letterSpacing: 0,
    color: "#3A3A3A",
    marginBottom: 30,
    paddingLeft: 10,
  },
  formContainer: {
    gap: 15,
  },
  input: {
    backgroundColor: "white",
    marginBottom: 5,
  },
  forgotPassword: {
    alignSelf: "flex-start",
    marginTop: -5,
  },
  buttonContainer: {
    marginTop: 25,
  },
  bottomButtonContainer: {
    paddingHorizontal: 35,
    paddingBottom: 50,
    paddingTop: 20,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
    fontFamily: "Montserrat",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signupText: {
    fontFamily: "Inter_400Regular",
    color: "#3A3A3A",
  },
  signupButton: {
    color: "#2A46FF",
    fontWeight: "600",
  },
  snackbar: {
    backgroundColor: "#292929",
  },
});

export default SignUp;
