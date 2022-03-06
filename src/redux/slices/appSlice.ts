import {createSlice} from '@reduxjs/toolkit';

interface chatListItem {
  id: string;
  username: string;
  email: string;
  time: string;
  profileImageUrl: string;
  deviceToken?: string;
}

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    chatListUpdate: false,
    chatList: [] as chatListItem[],
  },
  reducers: {
    updateChatList: state => {
      state.chatListUpdate = !state.chatListUpdate;
    },
  },
});

export const appActions = appSlice.actions;

export const appSelector = (state: any) => {
  return state.app;
};
