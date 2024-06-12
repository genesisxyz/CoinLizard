import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react-native';
import * as React from 'react';

import { messages } from '../../locales/en/messages';
import { RootStackParamList } from '../../routes';
import { useStore } from '../../store';
import DetailScreen from '../DetailScreen';
import FavoritesScreen from '../FavoritesScreen';

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity,
    },
  },
});

i18n.load({
  en: messages,
});

const TestingProvider = ({ children }: any) => <I18nProvider i18n={i18n}>{children}</I18nProvider>;

describe('FavoritesScreen', () => {
  it('FavoritesScreen renders coins list', async () => {
    act(() => {
      i18n.activate('en');
    });

    useStore.setState({
      favoriteCoins: new Map([
        ['btc', { id: 'btc', name: 'Bitcoin', marketCapRank: 1, image: '', symbol: 'BTC' }],
      ]),
    });

    const Stack = createNativeStackNavigator<RootStackParamList>();

    render(
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Favorites" component={FavoritesScreen} />
              <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </GluestackUIProvider>
      </QueryClientProvider>,
      {
        wrapper: TestingProvider,
      },
    );

    expect(await screen.findByText('Bitcoin')).toBeOnTheScreen();
  });
});
