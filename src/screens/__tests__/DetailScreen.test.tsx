import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import * as React from 'react';

import { messages } from '../../locales/en/messages';
import { RootStackParamList } from '../../routes';
import { useStore } from '../../store';
import DetailScreen from '../DetailScreen';

i18n.load({
  en: messages,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity,
    },
  },
});

const TestingProvider = ({ children }: any) => <I18nProvider i18n={i18n}>{children}</I18nProvider>;

jest.mock('../../api/coins/getCoin', () => {
  const module = jest.requireActual('../../api/coins/getCoin');

  const coin = require('../../api/coins/fixtures/coin.json');

  module.getCoin = jest.fn().mockResolvedValue(coin);

  return module;
});

jest.mock('../../components/Chart', () => {
  const module = jest.requireActual('../../components/Chart');

  module.default = jest.fn().mockReturnValue(null);

  return module;
});

jest.mock('../../api/coins/getCoinOHLC', () => {
  const module = jest.requireActual('../../api/coins/getCoin');

  module.getCoinOHLC = jest.fn().mockResolvedValue([[0, 0, 0, 0, 0]]);

  return module;
});

beforeEach(() => {
  i18n.activate('en');

  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
});

describe('DetailScreen', () => {
  it('should render coin detail', async () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    render(
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Detail" component={DetailScreen} initialParams={{ id: 'btc' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </GluestackUIProvider>
      </QueryClientProvider>,
      {
        wrapper: TestingProvider,
      },
    );

    expect(await screen.findByText('$70,906.00')).toBeOnTheScreen();
  });

  it('should add to favorites', async () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    render(
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Detail" component={DetailScreen} initialParams={{ id: 'btc' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </GluestackUIProvider>
      </QueryClientProvider>,
      {
        wrapper: TestingProvider,
      },
    );

    fireEvent.press(screen.getByTestId('favorite-button'));

    expect(await screen.findByText('Favorite Added')).toBeOnTheScreen();
  });

  it('should remove from favorites', async () => {
    // add one coin to favorites
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
              <Stack.Screen name="Detail" component={DetailScreen} initialParams={{ id: 'btc' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </GluestackUIProvider>
      </QueryClientProvider>,
      {
        wrapper: TestingProvider,
      },
    );

    // remove the coin from favorites
    fireEvent.press(screen.getByTestId('favorite-button'));

    expect(await screen.findByText('Favorite Removed')).toBeOnTheScreen();
  });
});
