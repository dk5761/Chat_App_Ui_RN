import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function registerForPushNotificationsAsync() {
  // Register the device with FCM
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();
  await AsyncStorage.setItem('devicePushToken', token);
  console.log('the devicePushToken is the following: ', token);

  return token;
}
