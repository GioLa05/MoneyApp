import React from 'react';
import { View, Text } from 'react-native';

const Notifications = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: 'Montserrat',
          fontWeight: '700',
          fontSize: 24,
          color: '#3A3A3A',
        }}
      >
        Notifications
      </Text>
    </View>
  );
};

export default Notifications;
