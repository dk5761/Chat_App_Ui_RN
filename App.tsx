import React, {ReactComponentElement, useEffect, useRef, useState} from 'react';
import Routes from './src/navigation/Routes';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import {socketActions} from './src/redux/slices/socketSlice';
//import RNBootSplash from 'react-native-bootsplash';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App: React.FC = () => {
  // intialize the firebase
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
  const onMessageReceived = async (data: any) => {
    console.log(data);
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    await notifee.displayNotification({
      title: data.data.title,
      body: data.data.message,
      android: {
        channelId,
        smallIcon: 'ic_stat_arrow_drop_down_circle',
        pressAction: {
          id: 'default',
          mainComponent: 'chatListScreen',
        },
      },
    });
  };
  //connect to socket
  store.dispatch(socketActions.startConnecting());

  useEffect(() => {
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
    notifee.onForegroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;
      switch (type) {
        case EventType.DISMISSED:
          //@ts-ignore
          await notifee.cancelNotification(notification?.id);
          break;
        case EventType.PRESS:
          // console.log('User pressed notification', detail.notification);
          break;
      }
    });
    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;
      switch (type) {
        case EventType.DISMISSED:
          //@ts-ignore
          await notifee.cancelNotification(notification?.id);
          break;
        case EventType.PRESS:
          // console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  // RNBootSplash.hide();
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
