import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/authScreens/LoginScreen';
import RegisterScreen from '../screens/authScreens/RegisterScreen';
import {RootStackParamList} from './types';
import ChatStack from './ChatNav';
import {useDispatch, useSelector} from 'react-redux';
import {checkState, userSelector} from '../redux/slices/userSlice';
import AppLoading from 'expo-app-loading';
import {Image, Pressable, ToastAndroid, View} from 'react-native';
import ChatListScreen from '../screens/chatScreens/ChatListScreen';
import {socketActions, socketSelector} from '../redux/slices/socketSlice';
import AddUserScreen from '../screens/userScreens/AddUser';

const Stack = createStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
  const dispatch = useDispatch();
  // let isLoggedIn = null;
  useEffect(() => {
    dispatch(checkState());
  }, []);

  const userState = useSelector(userSelector);
  const socketState = useSelector(socketSelector);

  if (!userState) {
    return <AppLoading />;
  }

  // if (userState.isLoggedIn && !socketState.isConnected) {
  //   dispatch(socketActions.startConnecting());
  // }
  // const isLoggedIn = ;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ChatListScreen"
        screenOptions={({navigation}) => ({
          headerRight: props => (
            <View>
              <Pressable
                onPress={() =>
                  navigation.navigate('ChatStack', {
                    screen: 'Profile',
                    params: {
                      data: {
                        username: userState.username.toLowerCase(),
                        profileImageUrl:
                          'https://static.wikia.nocookie.net/bokunoheroacademia/images/d/dd/Dabi_taunts_Vlad_King.png/revision/latest?cb=20180519180114',
                        email: userState.email,
                      },
                    },
                  })
                }
                onLongPress={() =>
                  ToastAndroid.show('Profile', ToastAndroid.SHORT)
                }>
                <Image
                  source={{
                    uri: 'https://static.wikia.nocookie.net/bokunoheroacademia/images/d/dd/Dabi_taunts_Vlad_King.png/revision/latest?cb=20180519180114',
                  }}
                  style={{
                    height: 30,
                    width: 30,
                    marginHorizontal: 20,
                    borderRadius: 14,
                    marginTop: 6,
                  }}
                />
              </Pressable>
            </View>
          ),
        })}>
        {userState.isLoggedIn ? (
          <>
            <Stack.Screen
              name="ChatListScreen"
              component={ChatListScreen}
              options={{
                headerShown: true,
                title: 'Home',
                headerStatusBarHeight: 20,
                headerTitleStyle: {
                  fontFamily: 'Nunito-Bold',
                  fontSize: 25,
                },
              }}
            />
            <Stack.Screen
              name="ChatStack"
              component={ChatStack}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddUser"
              component={AddUserScreen}
              options={{
                headerShown: true,
                headerRight: props => <View></View>,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
