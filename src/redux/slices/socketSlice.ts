import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

export interface User {
  id: string;
  username: string;
  email: string;
}

interface payloadMessage {
  sender_id: string;
  reciever_id: string;
  message: string;
  time: string;
  status: string;
}

interface messageObject {
  [key: string]: payloadMessage[];
}

interface chatStatusItem {
  [key: string]: boolean;
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    isConnected: false,
    isEstablishingConnection: false,
    broadcast_messages: [{}],
    messageList: {} as messageObject,
    readStatus: {} as chatStatusItem,
  },
  reducers: {
    startConnecting: state => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: state => {
      state.isConnected = true;
      state.isEstablishingConnection = false;
    },
    sendBroadcastMessage: (state, action) => {
      state.broadcast_messages.push(action.payload);
      return;
    },
    sendMessage: (state, action: PayloadAction<payloadMessage>) => {
      if (state.messageList[action.payload.reciever_id]) {
        state.messageList[action.payload.reciever_id].push(action.payload);
      } else {
        state.messageList[action.payload.reciever_id] = [action.payload];
      }
      return;
    },
    recieveBroadcastMessage: (state, action) => {
      state.broadcast_messages.push(action.payload);
    },

    recieveMessage: (state, action) => {
      if (state.messageList[action.payload.sender_id]) {
        state.messageList[action.payload.sender_id].push(action.payload);
      } else {
        state.messageList[action.payload.sender_id] = [action.payload];
      }
      state.readStatus[action.payload.sender_id] = false;
    },

    clearMessages: (state, action) => {
      state.messageList[action.payload.id] = [];
    },

    readTheMessage: (state, action) => {
      state.readStatus[action.payload.id] = true;
    },

    onDisconnected: state => {
      state.isConnected = false;
    },
    onLogOut: state => {
      state.isConnected = false;
    },
  },
});

export const socketActions = socketSlice.actions;

export const socketSelector = (state: any) => {
  return state.socket;
};
