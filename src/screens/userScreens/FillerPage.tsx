import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type Props = {};

const FillerPage: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Type to search user</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 5,
  },
  text: {
    fontFamily: "Nunito_600SemiBold",
  },
});

export default FillerPage;
