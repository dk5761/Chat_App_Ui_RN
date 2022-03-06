import React, {ReactComponentElement, useEffect, useRef, useState} from 'react';
import Routes from './src/navigation/Routes';
import {LogBox} from 'react-native';
import {
  Nunito_600SemiBold,
  Nunito_500Medium,
  Nunito_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {socketActions} from './src/redux/slices/socketSlice';
import RNBootSplash from 'react-native-bootsplash';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    RNBootSplash.hide();
    return <AppLoading />;
  }

  //connect to socket

  store.dispatch(socketActions.startConnecting());

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
