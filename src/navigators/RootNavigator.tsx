import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../routes';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { _ } = useLingui();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: _(msg`Home`) }} />
    </Stack.Navigator>
  );
}