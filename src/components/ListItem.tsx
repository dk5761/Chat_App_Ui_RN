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
import {
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Feather} from '@expo/vector-icons';

export type Props = {
  item: {
    id: string;
    username: string;
    email: string;
    profileImageUrl: string;
    time: string;
    deviceToken?: string;
  };
  onDismiss: (item: any) => void;
  readStatus: boolean | undefined;
};

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const Translate_X_threshold = -SCREEN_WIDTH * 0.3;
const itemHeight = 95;

const ListItem: React.FC<Props> = ({item, onDismiss, readStatus}) => {
  const navigation = useNavigation<any>(); // had to set to any cause of prettier and ts not ignoring the wrong typing
  const translateX = useSharedValue(0);
  const animatedHeight = useSharedValue(itemHeight);
  const animatedHeight2 = useSharedValue(85);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      if (event.translationX > 0) {
        translateX.value = 0;
      } else {
        translateX.value = event.translationX;
      }
    },
    onEnd: () => {
      const dismissed = translateX.value < Translate_X_threshold;

      if (dismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        animatedHeight.value = withTiming(0);
        animatedHeight2.value = withTiming(0);
        runOnJS(onDismiss)(item);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < Translate_X_threshold ? 1 : 0,
    );

    return {opacity};
  });

  const rContainerStyle = useAnimatedStyle(() => {
    return {height: animatedHeight.value};
  });
  const rChangeHeight = useAnimatedStyle(() => {
    return {height: animatedHeight2.value};
  });

  const rstyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <>
      <Animated.View style={[styles.icon, rIconContainerStyle]}>
        <Feather name="trash-2" size={60 * 0.4} color="red" />
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={panGesture}
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}>
        <Animated.View
          style={[styles.parentContainer, rstyle, rContainerStyle]}>
          <Pressable
            onPress={() => {
              navigation.navigate('ChatStack', {
                screen: 'Chat',
                params: {
                  data: item,
                },
              });
            }}>
            <Animated.View style={[styles.container, rChangeHeight]}>
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
                <View style={styles.statusHolder}>
                  <View style={styles.statusDot} />
                </View>
              </View>
              <View style={styles.middle}>
                <Text style={styles.title}>{item.username}</Text>
                {readStatus === false ? (
                  <Text style={styles.lastMessage}>
                    You have unread messages
                  </Text>
                ) : (
                  <></>
                )}
              </View>
              <View style={styles.lower}>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </Animated.View>
          </Pressable>
        </Animated.View>
      </PanGestureHandler>
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
  statusHolder: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    bottom: 0,
    right: 0,
  },
  statusDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#2675EC',
    borderRadius: 30,
    bottom: 5,
    right: 5,
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
    fontFamily: 'Nunito-Bold',
    fontSize: 23,
    backgroundColor: 'white',
    marginBottom: 8,
    color: 'black',
  },
  lastMessage: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 15,
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

export default ListItem;
