import React, {Dispatch, SetStateAction} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import PlusSVG from './svgComponents/plus';
import {AntDesign} from '@expo/vector-icons';

export type Props = {
  onChangeText: any;
  onSubmit: () => void;
  value: string;
  stylex?: {};
};

const InputBox: React.FC<Props> = ({onChangeText, onSubmit, value, stylex}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, stylex]}
          placeholder="Type your message"
          placeholderTextColor={'#848484'}
          selectionColor={'#2675EC'}
          onChangeText={onChangeText}
          value={value}
          // onSubmitEditing={onSubmit}
          numberOfLines={5}
          multiline={true}
        />
        <View style={styles.iconContainer}>
          <PlusSVG
            style={{
              marginLeft: 10,
              opacity: 0,
            }}
          />
          <Pressable onPress={onSubmit}>
            <AntDesign
              name="caretright"
              size={24}
              color="#2675EC"
              style={{
                marginLeft: 10,
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: 'white',
    width: '100%',
    bottom: 0,
    paddingVertical: 10,
    // borderWidth: 1,
    paddingHorizontal: 20,
  },
  inputContainer: {
    height: 50,
    // borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
  },
  textInput: {
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 2,
    flex: 4,
    color: 'black',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default InputBox;
