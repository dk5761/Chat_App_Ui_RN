import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  StyleSheet,
} from 'react-native';

export type Props = {
  item: {
    _id: string;
    username: string;
    email: string;
    profileImageUrl: string;
    deviceToken?: string;
  };
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const UserListItem: React.FC<Props> = ({item}) => {
  const navigation = useNavigation<any>(); // had to set to any cause of prettier and ts not ignoring the wrong typing
  return (
    <>
      <View style={[styles.parentContainer]}>
        <Pressable
          onPress={() => {
            navigation.navigate('ChatStack', {
              screen: 'Chat',
              params: {
                data: {
                  id: item._id,
                  username: item.username,
                  email: item.email,
                  profileImageUrl: item.profileImageUrl,
                  time: '',
                  deviceToken: item.deviceToken,
                },
              },
            });
          }}>
          <View style={[styles.container]}>
            <View style={styles.imageHolder}>
              <Pressable
                onPress={() => {
                  console.log('clicked on the image');
                }}
                style={({pressed}) => [{opacity: pressed ? 0.9 : 1.0}]}>
                <Image
                  source={{uri: item.profileImageUrl}}
                  style={styles.image}
                />
              </Pressable>
            </View>
            <View style={styles.middle}>
              <Text style={styles.title}>{item.username}</Text>
              <Text style={styles.lastMessage}>{item.email}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 2,
    maxHeight: 85,
    height: 85,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: 'white',
  },
  imageHolder: {
    height: 80,
    width: 80,
    borderRadius: 30,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 30,
  },
  middle: {
    flex: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 23,
    backgroundColor: 'white',
  },
  lastMessage: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    color: '#2675EC',
    paddingLeft: 2,
  },
  lower: {
    flex: 1,
    paddingVertical: 10,
  },
  time: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 17,
    color: '#848484',
    paddingLeft: 2,
  },
  parentContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
  },
  icon: {
    height: 95,
    width: 95,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
  },
});

export default UserListItem;
