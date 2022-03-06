import { NavigatorScreenParams } from "@react-navigation/native";

export type MainTabParamList = {
  ChatListScreen: undefined;
  ChannelListScreen: undefined;
};

export type ChatStackParamList = {
  Chat: {
    data: any;
  }; // contains the user details
  Profile: {
    data: any;
  }; //contains the basic user details
};

export type ChannelStackParamList = {
  ChannelList: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ChatListScreen: undefined;
  ChatStack: NavigatorScreenParams<ChatStackParamList>;
  AddUser: undefined;
};
