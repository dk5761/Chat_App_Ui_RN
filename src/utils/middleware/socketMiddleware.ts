import AsyncStorage from '@react-native-async-storage/async-storage';
import {Middleware} from 'redux';
import {io, Socket} from 'socket.io-client';
import {socketActions} from '../../redux/slices/socketSlice';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import {addUser, checkUser} from '../../database/db';
import {appActions} from '../../redux/slices/appSlice';

const hostURL: string = 'https://hellox01.herokuapp.com';

// DeviceInfo.isEmulator().then(isEmulator => {
//   if (!isEmulator) {
//     hostURL = 'http://192.168.0.104:3000';
//   } else {
//     hostURL = 'http://10.0.2.2:3000';
//   }
// });

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return token;
    }
  } catch (e) {
    console.log('error check state', e);
  }
};

const socketMiddleware: Middleware = (store: any) => {
  let socket: Socket;
  const userState = store.getState().users;
  const socketState = store.getState().socket;

  return (next: any) => async (action: any) => {
    const isConnected = socket && socketState.isConnected;

    const addUserInChatList = async (id: string) => {
      try {
        const token = await getToken();
        if (token !== null) {
          const response = await axios.get(`${hostURL}/user/byID/${id}`, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          });
          let data = await response.data;
          console.log('socket data', data);
          const time = new Date();
          const res = await addUser({
            id: data._id,
            username: data.username,
            email: data.email,
            time: time.getHours() + ':' + time.getMinutes(),
            profileImageUrl: data.profileImageUrl,
            deviceToken: data.deviceToken,
          });
          if (res) {
            store.dispatch(appActions.updateChatList());
          }
        }
      } catch (e: any) {
        console.log('Error', e.response.data);
      }
    };

    if (socketActions.startConnecting.match(action)) {
      if (socketState.isConnected === false) {
        const token = await getToken();

        socket = io(`${hostURL}`, {
          transports: ['websocket', 'polling'],
          query: {
            token,
          },
        });

        socket.on('connect', () => {
          store.dispatch(socketActions.connectionEstablished());
          console.log('connected to socket: ', socket.id);
        });

        socket.on('disconnect', () => {
          store.dispatch(socketActions.onDisconnected());
          console.log('disconnected to socket: ', socket.id);

          if (token) {
            setTimeout(() => {
              socket.connect();
            }, 1000);
          }
        });

        socket.on('receive_broadcastmessage', payload => {
          store.dispatch(socketActions.recieveBroadcastMessage(payload));
        });

        socket.on('connect_error', () => {
          setTimeout(() => {
            socket.connect();
          }, 1000);
        });

        socket.on('receiveMessage', async payload => {
          const res = await checkUser(payload.sender_id);
          if (res) {
            addUserInChatList(payload.sender_id);
          }

          store.dispatch(socketActions.recieveMessage(payload));
        });
      }
    }

    if (socketActions.sendBroadcastMessage.match(action)) {
      socket.emit('send_broadcastmessage', action.payload);
    }

    if (socketActions.sendMessage.match(action)) {
      socket.emit('sendMessage', action.payload);
    }

    next(action);
  };
};

export default socketMiddleware;
