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
import {sendMessagePushNotification} from '../../utils/notifications';

export type Props = {
  route: RouteProp<ChatStackParamList, 'Chat'>;
  navigation: StackNavigationProp<ChatStackParamList>;
};

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
    const username = userState.username;
    const time = new Date();
    const data = {
      sender_id: userState.id,
      reciever_id: route.params.data.id,
      message: messageText,
      time: time.getHours() + ':' + time.getMinutes(),
      status: 'sent',
    };
    setMessageText('');
    console.log(route.params.data);
    addUser(route.params.data);
    dispatch(socketActions.sendMessage(data));
    sendMessagePushNotification(
      {username, message: messageText},
      route.params.data.deviceToken,
    );
    console.log('cakked ');
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
