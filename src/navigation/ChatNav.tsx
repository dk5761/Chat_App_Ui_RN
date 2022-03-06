import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../screens/chatScreens/ChatScreen";
import ProfileScreen from "../screens/chatScreens/ProfileScreen";
import { ChatStackParamList } from "./types";
import ChatHeader from "../components/stackHeader/ChatHeader";
import ProfileHeader from "../components/stackHeader/ProfileHeader";

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: (props) => <ChatHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ header: (props) => <ProfileHeader {...props} /> }}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
