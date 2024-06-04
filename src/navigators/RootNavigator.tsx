import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import { RootStackParamList } from '../routes';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { _ } = useLingui();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: _(msg`Home`) }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: _(msg`Detail`) }} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: _(msg`Search`),
          headerSearchBarOptions: {
            autoFocus: true,
          },
          animation: Platform.OS === 'ios' ? 'none' : 'default',
        }}
      />
    </Stack.Navigator>
  );
}
