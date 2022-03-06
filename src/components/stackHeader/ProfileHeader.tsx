import { StackHeaderProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type Props = StackHeaderProps;

const ProfileHeader: React.FC<Props> = ({ route, navigation }: any) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.headerLeft}>
          <Ionicons
            name="md-chevron-back-outline"
            size={28}
            color="#2675EC"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
  },
  headerLeft: {
    flex: 1,
    alignSelf: "center",
    marginRight: 15,
    marginLeft: 10,
  },
  middle: {
    flex: 9,
    flexDirection: "row",
  },
  image: {
    height: 60,
    width: 60,
    alignSelf: "center",
    borderRadius: 23,
  },
  title: {
    alignSelf: "center",
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    marginHorizontal: 10,
  },
  lower: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileHeader;
