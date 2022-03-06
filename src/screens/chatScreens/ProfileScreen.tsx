import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {logOut, userSelector} from '../../redux/slices/userSlice';
import {deleteChatList} from '../../database/db';

export type Props = {
  route: any;
};

const ProfileScreen: React.FC<Props> = ({route}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(userSelector);
  const LogOut = () => {
    dispatch(logOut({token}));
    deleteChatList();
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileDetails}>
        <Image
          source={{uri: route.params.data.profileImageUrl}}
          style={styles.image}
        />

        <View style={styles.detailsHolder}>
          <Text style={styles.title}>{route.params.data.username}</Text>
          <Text style={styles.email}>
            {route.params.data.email !== null
              ? route.params.data.email
              : 'JohnDoe@gmail.com'}
          </Text>
        </View>

        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={LogOut}
          onLongPress={() => ToastAndroid.show('LogOut', ToastAndroid.SHORT)}>
          <MaterialIcons name="logout" size={28} color="black" />
        </Pressable>
      </View>
      <View style={styles.accountDetailsContainer}>
        <Text
          style={{
            fontFamily: 'Nunito-Bold',
            fontSize: 22,
          }}>
          Account
        </Text>
        <View style={styles.accountDetails}>
          <Text style={[styles.email, {color: 'black', fontSize: 16}]}>
            {route.params.data.email}
          </Text>
          <Text style={styles.text}>Email</Text>
        </View>
        <View style={styles.usernameContainer}>
          <Text style={[styles.email, {color: 'black', fontSize: 16}]}>
            {route.params.data.username}
          </Text>
          <Text style={styles.text}>Username</Text>
        </View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 15,
  },
  profileDetails: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 30,
  },
  detailsHolder: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Nunito-Bold',
    color: '#131313',
  },
  email: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: '#848484',
    paddingLeft: 5,
  },
  accountDetailsContainer: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  accountDetails: {
    marginVertical: 8,
  },
  usernameContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
    color: '#848484',
    paddingLeft: 5,
  },
});

export default ProfileScreen;
