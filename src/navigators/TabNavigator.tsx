import { FavouriteIcon, GlobeIcon, Icon } from '@gluestack-ui/themed';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList } from '../routes';
import FavoritesNavigator from './FavoritesNavigator';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function TabNavigator() {
  const { _ } = useLingui();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          title: _(msg`Home`),
          tabBarIcon: ({ color }) => <Icon as={GlobeIcon} color={color} />,
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesNavigator}
        options={{
          title: _(msg`Favorites`),
          tabBarIcon: ({ color }) => <Icon as={FavouriteIcon} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
