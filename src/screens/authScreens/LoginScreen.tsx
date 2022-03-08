import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import TextInputField from '../../components/TextInput';
import {loginUser} from '../../redux/slices/userSlice';
import DeviceInfo from 'react-native-device-info';

export type Props = {
  navigation: any;
};

let static_email: string;
let static_password: string;
DeviceInfo.isEmulator().then(isEmulator => {
  if (!isEmulator) {
    static_email = 'qwe@asd.com';
    static_password = 'qwe';
  } else {
    static_email = 'zxc@asd.com';
    static_password = 'zxc';
  }
});

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  DeviceInfo.isEmulator().then(isEmulator => {
    if (!isEmulator) {
      setEmail('asd@asd.com');
      setPassword('asd');
    } else {
      setEmail('qwe@asd.com');
      setPassword('qwe');
    }
  });
  //create refs for the inputs
  const emailRef: any = useRef<TextInput>();
  const passwordRef: any = useRef<TextInput>();

  const dispatch = useDispatch();
  const login = async (email: string, password: string) => {
    if (email === '' || password === '') {
      return Alert.alert(
        'Invalid Credentials',
        'Please enter proper credentials',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
    }

    dispatch(
      loginUser({
        email: email.toLowerCase(),
        password,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Nunito-Bold',
            fontSize: 26,
            color: 'black',
          }}>
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
          styleButtonContainer={{alignSelf: 'center'}}
        />
        <View style={styles.spacer} />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                fontSize: 14,

                color: 'black',
              }}>
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
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  imageHolder: {
    flex: 2,
  },
  inputHolder: {
    // flex: 1,
    // borderWidth: 1,

    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: 'space-evenly',
  },
  spacer: {
    height: 20,
  },
});

export default LoginScreen;
