import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export type Props = {
  value: string;
  onPress: () => void;
  styleButtonContainer?: any;
  styleButtonText?: any;
  color: string;
  textColor: string;
};

const CustomButton: React.FC<Props> = ({
  value,
  onPress,
  styleButtonContainer,
  color,
  textColor,
  styleButtonText,
}) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1.0 }]}
      >
        <View
          style={[
            styles.buttonContainer,
            styleButtonContainer,
            {
              backgroundColor: color,
            },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: textColor,
              },
              styleButtonText,
            ]}
          >
            {value}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 42,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
  },
  buttonText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
  },
});

export default CustomButton;
