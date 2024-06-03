import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react-native';
import * as React from 'react';

import { messages } from '../locales/en/messages';
import RootNavigator from './RootNavigator';

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

jest.mock('../api/coins/getCoinsMarkets', () => {
  const coinMarket = require('../api/coins/fixtures/coinMarket.json');
  return {
    getCoinsMarkets: jest.fn().mockResolvedValue([coinMarket]),
  };
});

const TestingProvider = ({ children }: any) => <I18nProvider i18n={i18n}>{children}</I18nProvider>;

test('RootNavigator renders coins list', async () => {
  act(() => {
    i18n.activate('en');
  });

  render(
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <RootNavigator />
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
