import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import TextInputField from '../../components/TextInput';
import {
  clearLoginError,
  loginUser,
  registerUser,
  userSelector,
} from '../../redux/slices/userSlice';

export type Props = {
  navigation: any;
};

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('assd');
  const [username, setUsername] = useState<string>('');
  const [repassword, setRepassword] = useState<string>('assd');

  //create refs for the inputs
  const emailRef: any = useRef<TextInput>();
  const passwordRef: any = useRef<TextInput>();
  const usernameRef: any = useRef<TextInput>();
  const repasswordRef: any = useRef<TextInput>();

  const dispatch = useDispatch();
  const register = async (
    email: string,
    username: string,
    password: string,
    repassword: string,
  ) => {
    if (
      email === '' ||
      password === '' ||
      username === '' ||
      repassword === ''
    ) {
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

    if (repassword !== password) {
      return Alert.alert(
        'Invalid Credentials',
        'Passwords do not match',
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
      registerUser({
        email,
        password,
        username,
      }),
    );
  };

  const {isError, errorMessage} = useSelector(userSelector);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isError && isFocused) {
      Alert.alert('Error Registering the User', errorMessage, [
        {
          text: 'Cancel',
          onPress: () => dispatch(clearLoginError()),
          style: 'cancel',
        },
      ]);
    }
  }, [isError]);

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
          Register
        </Text>
      </View>
      <View style={styles.inputHolder}>
        <TextInputField
          value={email}
          onChangeText={setEmail}
          onComplete={() => usernameRef.current.focus()}
          placelabel="Email"
          ref={emailRef}
        />
        <View style={styles.spacer} />
        <TextInputField
          value={username}
          onChangeText={setUsername}
          onComplete={() => passwordRef.current.focus()}
          autoCapitalize="none"
          placelabel="Username"
          ref={usernameRef}
        />
        <View style={styles.spacer} />
        <TextInputField
          value={password}
          onChangeText={setPassword}
          onComplete={() => repasswordRef.current.focus()}
          autoCapitalize="none"
          placelabel="Password"
          ref={passwordRef}
        />
        <View style={styles.spacer} />
        <TextInputField
          value={repassword}
          onChangeText={setRepassword}
          onComplete={() => register(email, username, password, repassword)}
          autoCapitalize="none"
          placelabel="Password"
          ref={repasswordRef}
        />
        <View style={styles.spacer} />
        <CustomButton
          onPress={() => register(email, username, password, repassword)}
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
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                fontSize: 14,
                color: 'black',
              }}>
              Existing User? Click here to Login
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

export default RegisterScreen;
