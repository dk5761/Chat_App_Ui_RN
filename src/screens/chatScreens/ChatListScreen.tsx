import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, AppRegistry} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import FloatingButton from '../../components/floatingButton/floatingButton';
import ListItem from '../../components/ListItem';
import {deleteUser, getChatList} from '../../database/db';
import {appSelector} from '../../redux/slices/appSlice';
import {socketActions, socketSelector} from '../../redux/slices/socketSlice';
import {userSelector} from '../../redux/slices/userSlice';

interface chatListItem {
  id: string;
  username: string;
  email: string;
  time: string;
  profileImageUrl: string;
  deviceToken?: string;
}

const ChatListScreen: React.FC = () => {
  const [chatList, setChatList] = useState<chatListItem[]>([]);
  const socketState = useSelector(socketSelector);
  const appState = useSelector(appSelector);
  const userState = useSelector(userSelector);

  const chatListUpdate = appState.chatListUpdate;

  const setList = (value: any) => {
    setChatList(value);
  };
  const isFocussed = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocussed) {
      (async () => {
        const val = await getChatList();
        setChatList(val);
      })();
    }
    //connect to socket if isConnected values false

    if (!socketState.isConnected) {
      dispatch(socketActions.startConnecting());
    }
  }, [isFocussed, chatListUpdate]);

  const scrollRef = useRef(null);

  const onDismiss = useCallback((item: any) => {
    deleteUser(item.id);
    const val = getChatList();
    setList(val);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={scrollRef}
        data={chatList}
        renderItem={({item}) => {
          const status = socketState.readStatus[item.id];
          return (
            <ListItem item={item} readStatus={status} onDismiss={onDismiss} />
          );
        }}
        keyExtractor={item => item.id}
      />
      <FloatingButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 10,
  },
});

export default ChatListScreen;
AppRegistry.registerComponent('chatListScreen', () => ChatListScreen);
