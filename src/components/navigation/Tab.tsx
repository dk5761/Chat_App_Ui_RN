import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  label: any;
  isCurrent?: boolean;
};

export const Tab = ({ label, isCurrent }: Props) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: isCurrent ? "white" : "black", ...style.Text }}>
        {label}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  Text: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 17,
  },
});
