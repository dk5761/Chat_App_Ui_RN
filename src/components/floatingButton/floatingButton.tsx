import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export type Props = {};

const FloatingButton: React.FC<Props> = () => {
  const navigation: any = useNavigation();

  return (
    <Pressable
      style={styles.buttonContainer}
      onPress={() => navigation.navigate("AddUser")}
    >
      <Ionicons
        style={styles.buttonIcon}
        name="ios-add-circle"
        size={63}
        color="#2675EC"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "white",
    // borderWidth: 1,

    width: 60,
    height: 60,
    paddingLeft: 2,
    borderRadius: 50,
  },
  buttonIcon: {
    bottom: 4,
    right: 3,
  },
});

export default FloatingButton;
