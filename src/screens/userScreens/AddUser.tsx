import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import TextInputField from "../../components/TextInput";
import { userSelector, userSlice } from "../../redux/slices/userSlice";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import UserListItem from "../../components/listItems/userListItem";
import FillerPage from "./FillerPage";

export type Props = {};

let hostURL: string;
DeviceInfo.isEmulator().then((isEmulator) => {
  if (!isEmulator) {
    hostURL = "http://192.168.0.104:3000";
  } else {
    hostURL = "http://10.0.2.2:3000";
  }
});
const AddUserScreen: React.FC<Props> = () => {
  const [searchText, setSearchText] = useState("");
  const userState = useSelector(userSelector);
  const [userList, setUserList] = useState([]);

  const search = async (val: string) => {
    setSearchText(val);
    const response = await axios.get(`${hostURL}/user/${val}`, {
      headers: {
        Authorization: "Bearer " + userState.token,
      },
    });
    setUserList(response.data);
  };
  const ref = useRef(null);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInputField
            value={searchText}
            onChangeText={(val: string) => search(val)}
            onComplete={() => search}
            placelabel="Search User"
            ref={ref}
            containerStyle={styles.textInput}
          />
        </View>
        <View>
          {userList.length > 0 ? (
            <FlatList
              keyExtractor={(item: any, index) => item._id}
              data={userList}
              renderItem={({ item }) => (
                <>
                  <UserListItem item={item} />
                </>
              )}
            />
          ) : (
            <FillerPage />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // borderWidth: 1,
  },
  searchContainer: {
    backgroundColor: "white",
    margin: 10,
    marginTop: 20,
  },
  textInput: {
    borderRadius: 50,
    height: 44,
    alignItems: "center",
  },
});
export default AddUserScreen;
