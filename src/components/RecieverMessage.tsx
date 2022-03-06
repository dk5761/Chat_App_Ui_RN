import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export type Props = {
  item: any;
};

const RecieverMessage: React.FC<Props> = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.messageBody}>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  messageBody: {
    alignSelf: 'center',
    backgroundColor: '#2675EC',
    borderRadius: 25,
    borderBottomLeftRadius: 4,
    marginLeft: 15,
    maxWidth: '60%',
  },
  message: {
    margin: 12,
    marginLeft: 17,
    fontFamily: 'Nunito-SemiBold',
    color: 'white',
    padding: 3,
  },
  time: {
    // alignSelf: "center",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Nunito-SemiBold',
    color: '#2675EC',
    opacity: 0,
  },
});
export default RecieverMessage;
