import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, Text, View } from '@gluestack-ui/themed';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react-native';
import * as React from 'react';

import { messages } from '../../locales/en/messages';
import { RootStackParamList } from '../../routes';
import HomeScreen from '../HomeScreen';

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

jest.mock('../../api/coins/getCoinsMarkets', () => {
  const module = jest.requireActual('../../api/coins/getCoinsMarkets');

  const coinMarket = require('../../api/coins/fixtures/coinMarket.json');

  module.getCoinsMarkets = jest.fn().mockResolvedValue([coinMarket]);

  return module;
});

const TestingProvider = ({ children }: any) => <I18nProvider i18n={i18n}>{children}</I18nProvider>;

beforeEach(() => {
  i18n.activate('en');

  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('HomeScreen', () => {
  it('should render coins list', async () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    render(
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </GluestackUIProvider>
      </QueryClientProvider>,
      {
        wrapper: TestingProvider,
      },
    );

    expect(await screen.findByText('btc')).toBeOnTheScreen();
    expect(await screen.findByText('1.4%')).toBeOnTheScreen();
    expect(await screen.findByText('0.7%')).toBeOnTheScreen();
    expect(await screen.findByText('$68,980.00')).toBeOnTheScreen();
    expect(await screen.findByText('$1,360,405,926,441.00')).toBeOnTheScreen();
  });

  it('should open search screen', async () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    const SearchScreen = () => (
      <View>
        <Text>Search screen</Text>
      </View>
    );

    render(
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </GluestackUIProvider>
      </QueryClientProvider>,
      {
        wrapper: TestingProvider,
      },
    );

    const searchButton = await screen.findByText('Search');

    fireEvent.press(searchButton);

    expect(await screen.findByText('Search screen')).toBeOnTheScreen();
  });

  it('should load more coins when scrolling', async () => {
    // TODO: Implement test
  });
});
