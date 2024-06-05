import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../routes';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function FavoritesNavigator() {
  const { _ } = useLingui();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: _(msg`Favorites`),
        }}
      />
    </Stack.Navigator>
  );
}
