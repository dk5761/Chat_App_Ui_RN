import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export type Props = {
  onComplete?: any;
  onChangeText: any;
  placelabel?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  selectionColor?: string;
  stylex?: any;
  value: string;
  containerStyle?: any;
};

const TextInputField = React.forwardRef<TextInput, Props>(
  (props: Props, ref?: React.LegacyRef<TextInput>) => {
    return (
      <View style={[styles.inputContainer, props.containerStyle]}>
        <TextInput
          enablesReturnKeyAutomatically
          style={[styles.textInput, props.stylex]}
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onComplete}
          placeholder={props.placelabel}
          autoCapitalize={props.autoCapitalize}
          autoComplete="off"
          selectionColor={
            props.selectionColor ? props.selectionColor : '#d2d9d0'
          }
          ref={ref}
          value={props.value}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    borderColor: '#d2d9d0',
  },
  textInput: {
    height: 50,
    borderRadius: 14,
    paddingHorizontal: 2,
    flex: 4,
  },
});

export default TextInputField;
