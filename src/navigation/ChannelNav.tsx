import { createStackNavigator } from "@react-navigation/stack";
import { ChannelStackParamList } from "./types";

const Stack = createStackNavigator<ChannelStackParamList>();

const ChannelStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="ChannelList"
        component={ChannelListScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default ChannelStack;
