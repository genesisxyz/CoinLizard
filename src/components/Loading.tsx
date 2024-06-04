import { useToken, View } from '@gluestack-ui/themed';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export const Loading = () => {
  const primary400 = useToken('colors', 'primary400');

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator color={primary400} size="large" animating />
    </View>
  );
};
