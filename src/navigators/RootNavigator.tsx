import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import { RootStackParamList } from '../routes';
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { _ } = useLingui();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{
          title: '',
        }}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'card',
        }}>
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: true,
            title: _(msg`Detail`),
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: true,
            title: _(msg`Search`),
            headerSearchBarOptions: {
              autoFocus: true,
            },
            animation: Platform.OS === 'ios' ? 'none' : 'default',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
