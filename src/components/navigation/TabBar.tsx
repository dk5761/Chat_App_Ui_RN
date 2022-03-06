import React, { useEffect, useState } from 'react';
import {  View, Dimensions, StyleSheet, Pressable} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Tab } from './Tab';

type Props = {
    state: any,
    descriptors: any,
    navigation: any,
    position: any
}

const CustomTabBar : React.FC<Props>= ({ state, descriptors, navigation, position }) => {
    const totalWidth = Dimensions.get("window").width;
    const tabWidth = totalWidth / state.routes.length;
    const translateVal = useSharedValue(0)

    const animateSlider = (index: number) => {
      'worklet';      
      translateVal.value = index * tabWidth
     
    };

    const animatedStyle = useAnimatedStyle(()=>{
      return {
        transform: [{
          translateX: withSpring(translateVal.value,{
            damping: 13
          })
        }]
      }
    })

    useEffect(() => {
      animateSlider(state.index);
    }, [state.index]);

  return (<View style={[style.tabContainer, { width: totalWidth }]}>
    <View style={{ flexDirection: 'row' }}>
    <Animated.View
          style={[
            style.slider,
            {
              
              width: tabWidth - 30,
              alignSelf:'center'
            },
            animatedStyle
          ]}
        />
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
      
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

       

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Tab
              label={label}
              isCurrent={isFocused}
            />
          </Pressable>
        );
      })}
    </View></View>
  );
}

const style = StyleSheet.create({
  tabContainer: {
    height: 60,
    backgroundColor:'white',
    elevation: 0
  },
  slider: {
    height: 50,
    position: "absolute",
    margin:5,
    marginHorizontal: 15,
    backgroundColor: "#2675EC",
    borderRadius: 20,
    width: 10
},
 
});

export default CustomTabBar
