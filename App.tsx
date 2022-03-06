import React, {ReactComponentElement, useEffect, useRef, useState} from 'react';
import Routes from './src/navigation/Routes';
import {LogBox} from 'react-native';
import {
  Nunito_600SemiBold,
  Nunito_500Medium,
  useFonts,
} from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {socketActions} from './src/redux/slices/socketSlice';
import RNBootSplash from 'react-native-bootsplash';
import firebase from '@react-native-firebase/app';
import {registerForPushNotificationsAsync} from './src/utils/notifications';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_500Medium,
    // Nunito-Bold,
  });

  if (!fontsLoaded) {
    RNBootSplash.hide();
    return <AppLoading />;
  }

  const intializeFirebase = async () => {
    const firebaseCredentials = {
      apiKey: 'AIzaSyBywsjyORgNS5r1TwEV6DAzbnnxFRihbNE',
      authDomain: 'reactdb-83287.firebaseapp.com',
      databaseURL: 'https://reactdb-83287.firebaseio.com',
      projectId: 'reactdb-83287',
      storageBucket: 'reactdb-83287.appspot.com',
      messagingSenderId: '639063527296',
      appId: '1:639063527296:web:8b503e46ebdfb4416bfb65',
      measurementId: 'G-CPWNHE1PRY',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseCredentials);
    }
  };

  intializeFirebase(); // intialize the Firebase on AppLoading
  // registerForPushNotificationsAsync();

  //connect to socket
  store.dispatch(socketActions.startConnecting());

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
