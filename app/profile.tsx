import WhiteButton from "@/components/WhiteButton";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import TextField from "../components/TextField";

const Profile = () => {
  const router = useRouter();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  // Check if form is complete
  const isFormComplete =
    selectedImage !== null &&
    formValues.username.trim() !== "" &&
    formValues.firstName.trim() !== "" &&
    formValues.lastName.trim() !== "" &&
    formValues.dateOfBirth.length === 10; // DD-MM-YYYY format

  // Update form values
  const updateFormValue = (field: keyof typeof formValues, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Navigate back to sign up
  const navigateToSignUp = () => {
    router.dismissTo("/signUp");
  };

  // Handle form completion
  const handleFormComplete = () => {
    // Reset the navigation stack and go to homepage
    router.dismissAll();
    router.replace("/homepage");
  };

  // Handle photo selection
  const handleImagePicker = () => {
    Alert.alert("Select Photo", "Choose an option", [
      {
        text: "Camera",
        onPress: () => openCamera(),
      },
      {
        text: "Photo Library",
        onPress: () => openImageLibrary(),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Camera permission is required to take photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const openImageLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Photo library permission is required to select photos."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  return (
    <LinearGradient
      colors={["#4950F9", "#1937FE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={navigateToSignUp}
            style={{
              position: "absolute",
              top: 68,
              left: 30,
              padding: 10,
              zIndex: 10,
            }}
          >
            <Image
              style={{
                width: 26,
                height: 21,
                resizeMode: "contain",
              }}
              source={require("../assets/images/LeftArrow.png")}
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: 84,
                flex: 1,
              }}
            >
              <TouchableOpacity
                onPress={handleImagePicker}
                style={{ position: "relative", width: 121, height: 121 }}
              >
                <Image
                  source={require("../assets/images/bluePlusPurple.png")}
                  style={{
                    width: 121,
                    height: 121,
                    resizeMode: "contain",
                  }}
                />
                {selectedImage ? (
                  <Image
                    source={{ uri: selectedImage }}
                    style={{
                      position: "absolute",
                      top: 10.5,
                      left: 10.5,
                      width: 100,
                      height: 100,
                      borderRadius: 30,
                      resizeMode: "cover",
                    }}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/cameraIcon.png")}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 121,
                      height: 121,
                      resizeMode: "contain",
                    }}
                  />
                )}
              </TouchableOpacity>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 25,
                  width: "100%",
                  marginTop: 20,
                }}
              >
                <TextField
                  label="Username"
                  placeholder="Your username"
                  onValueChange={(value) => updateFormValue("username", value)}
                />
                <TextField
                  label="First Name"
                  placeholder="Your name"
                  onValueChange={(value) => updateFormValue("firstName", value)}
                />
                <TextField
                  label="Last Name"
                  placeholder="Your last name"
                  onValueChange={(value) => updateFormValue("lastName", value)}
                />
                <TextField
                  label="Date Of Birth"
                  placeholder="Your birthday (dd-mm-yyyy)"
                  keyboardType="numeric"
                  isDateField={true}
                  onValueChange={(value) =>
                    updateFormValue("dateOfBirth", value)
                  }
                />
              </View>
            </View>

            <View
              style={{
                paddingBottom: 75,
                paddingTop: isKeyboardVisible ? 50 : 0,
              }}
            >
              <WhiteButton
                disabled={!isFormComplete}
                onPress={handleFormComplete}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
});

export default Profile;
