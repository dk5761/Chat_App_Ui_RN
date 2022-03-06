import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type Props = {
  item: any;
};

const SenderMessage: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageBody}>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    marginVertical: 5,
  },
  messageBody: {
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    borderTopRightRadius: 4,
    marginRight: 15,
    maxWidth: "60%",
  },
  message: {
    margin: 12,
    marginLeft: 17,
    fontFamily: "Nunito_600SemiBold",
    color: "#131313",
    padding: 3,
  },
  time: {
    // alignSelf: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    fontFamily: "Nunito_600SemiBold",
    color: "#2675EC",
    opacity: 0,
  },
});

export default SenderMessage;
