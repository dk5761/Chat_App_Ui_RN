import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {View, ListRenderItem, FlatList, StyleSheet} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import InputBox from '../../components/InputBox';
import RecieverMessage from '../../components/RecieverMessage';
import SenderMessage from '../../components/SenderMessage';
import {addUser} from '../../database/db';
import {ChatStackParamList} from '../../navigation/types';
import {socketActions, socketSelector} from '../../redux/slices/socketSlice';
import {userSelector} from '../../redux/slices/userSlice';

export type Props = {
  route: RouteProp<ChatStackParamList, 'Chat'>;
  navigation: StackNavigationProp<ChatStackParamList>;
};

const serverKey =
  'AAAAlMsnj4A:APA91bHWdKsTI2X0q00gUHPvMScnYHvQKzv-z0yJzdv8zvhS6gWlj3xd9R_2hKpmOloII9neD9eRN48jSUoQQ0jYMnEvSi5KvbpKB3Uh8bv0ug9vTMIZ4f8AxNIjl4aGJSx7VgwZgqDn';

async function sendPushNotification(
  deviceToken: string,
  username: string,
  text: string,
) {
  // const message = {
  //   to: deviceToken,
  //   sound: "default",
  //   title: username,
  //   body: text,
  //   data: { someData: "goes here" },
  //   priority: "high",
  // };
  // await fetch("https://exp.host/--/api/v2/push/send", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Accept-encoding": "gzip, deflate",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(message),
  // });

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
        experienceId: '@darshank5761/Hello',
        scopeKey: '@darshank5761/Hello',
        title: username,
        message: text,
      },
    }),
  });
}

const ChatScreen: React.FC<Props> = ({route}) => {
  const socketState = useSelector(socketSelector, shallowEqual);
  const userState = useSelector(userSelector, shallowEqual);
  const messages = socketState.messageList[route.params.data.id];
  const messageList: any = messages === undefined ? [] : [...messages];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(socketActions.readTheMessage({id: route.params.data.id}));
  });

  const renderItem: ListRenderItem<any> = ({item}) => {
    if (userState.id === item.sender_id) {
      return <SenderMessage item={item} />;
    }
    return <RecieverMessage item={item} />;
  };

  const [messageText, setMessageText] = useState('');

  const sendMessage = () => {
    if (messageText === '') return;

    const time = new Date();
    const data = {
      sender_id: userState.id,
      reciever_id: route.params.data.id,
      message: messageText,
      time: time.getHours() + ':' + time.getMinutes(),
      status: 'sent',
    };
    setMessageText('');

    addUser(route.params.data);
    dispatch(socketActions.sendMessage(data));
    sendPushNotification(
      route.params.data.deviceToken,
      userState.username,
      messageText,
    );
  };

  const ref: any = useRef<FlatList>();
  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        style={{flex: 1}}
        data={messageList}
        onContentSizeChange={() => ref.current.scrollToEnd({animated: true})}
        onLayout={() => ref.current.scrollToEnd({animated: true})}
        renderItem={renderItem}
        keyExtractor={item => messageList.indexOf(item).toString()}
      />
      <InputBox
        onChangeText={setMessageText}
        value={messageText}
        onSubmit={() => {
          sendMessage();
        }}
        stylex={styles.inputBox}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 10,
  },
  inputBox: {
    maxHeight: 250,
  },
});
export default ChatScreen;
