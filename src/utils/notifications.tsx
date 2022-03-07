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

export const sendMessagePushNotification = async (
  data: {
    username: string;
    message: string;
  },
  deviceToken: string,
) => {
  const serverKey =
    'AAAAlMsnj4A:APA91bHWdKsTI2X0q00gUHPvMScnYHvQKzv-z0yJzdv8zvhS6gWlj3xd9R_2hKpmOloII9neD9eRN48jSUoQQ0jYMnEvSi5KvbpKB3Uh8bv0ug9vTMIZ4f8AxNIjl4aGJSx7VgwZgqDn';

  console.log(deviceToken);
  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key=${serverKey}`,
    },
    body: JSON.stringify({
      to: deviceToken,
      priority: 'high',
      data: {
        title: data.username,
        message: data.message,
      },
    }),
  });
};
