import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import CustomButton from "../../components/CustomButton";
import TextInputField from "../../components/TextInput";
import { loginUser } from "../../redux/slices/userSlice";

export type Props = {
  navigation: any;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("zxc@asd.com");
  const [password, setPassword] = useState<string>("zxc");
  //create refs for the inputs
  const emailRef: any = useRef<TextInput>();
  const passwordRef: any = useRef<TextInput>();

  const dispatch = useDispatch();
  const login = async (email: string, password: string) => {
    if (email === "" || password === "") {
      return Alert.alert(
        "Invalid Credentials",
        "Please enter proper credentials",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    }

    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Nunito_700Bold",
            fontSize: 26,
          }}
        >
          Login
        </Text>
      </View>
      <View style={styles.inputHolder}>
        <TextInputField
          value={email}
          onChangeText={setEmail}
          onComplete={() => passwordRef.current.focus()}
          placelabel="Email"
          ref={emailRef}
        />
        <View style={styles.spacer} />
        <TextInputField
          value={password}
          onChangeText={setPassword}
          onComplete={() => login(email, password)}
          autoCapitalize="none"
          placelabel="Password"
          ref={passwordRef}
        />
        <View style={styles.spacer} />

        <CustomButton
          onPress={() => login(email, password)}
          value="Submit"
          textColor="white"
          color="#2675EC"
          styleButtonContainer={{ alignSelf: "center" }}
        />
        <View style={styles.spacer} />
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                fontFamily: "Nunito_700Bold",
                fontSize: 14,
              }}
            >
              New user? Click here to register
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  imageHolder: {
    flex: 2,
  },
  inputHolder: {
    // flex: 1,
    // borderWidth: 1,

    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: "space-evenly",
  },
  spacer: {
    height: 20,
  },
});

export default LoginScreen;
