import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import ProfileRectSVG from '../svgComponents/profileDots';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import {socketActions} from '../../redux/slices/socketSlice';

type Props = StackHeaderProps;

const ChatHeader: React.FC<Props> = ({route, navigation}: any) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.headerLeft}>
          <Ionicons
            name="md-chevron-back-outline"
            size={28}
            color="#2675EC"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.middle}>
          <Image
            source={{uri: route.params.data.profileImageUrl}}
            style={styles.image}
          />
          <Text style={styles.title}>{route.params.data.username}</Text>
        </View>

        <View style={styles.lower}>
          <Pressable
            style={{
              marginRight: 15,
            }}
            onPress={() => {
              dispatch(socketActions.clearMessages({id: route.params.data.id}));
              ToastAndroid.show('Cleared the chat', ToastAndroid.SHORT);
            }}>
            <MaterialCommunityIcons
              name="delete-empty"
              size={26}
              color="#2675EC"
            />
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('Profile', {
                data: route.params.data,
              })
            }
            style={{
              marginRight: 15,
            }}>
            <ProfileRectSVG />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  headerLeft: {
    flex: 1,
    alignSelf: 'center',
    marginRight: 15,
    marginLeft: 10,
  },
  middle: {
    flex: 9,
    flexDirection: 'row',
  },
  image: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    borderRadius: 23,
  },
  title: {
    alignSelf: 'center',
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    marginHorizontal: 10,
    color: 'black',
  },
  lower: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default ChatHeader;
