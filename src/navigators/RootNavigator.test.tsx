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

jest.mock('../api/coins/getCoinsMarkets', () => ({
  getCoinsMarkets: jest.fn().mockResolvedValue([
    {
      id: 1,
      name: 'Bitcoin',
    },
    {
      id: 2,
      name: 'Ethereum',
    },
    {
      id: 3,
      name: 'Dogecoin',
    },
  ]),
}));

const TestingProvider = ({ children }: any) => <I18nProvider i18n={i18n}>{children}</I18nProvider>;

test('RootNavigator renders coins list', async () => {
  act(() => {
    i18n.activate('en');
  });

  render(
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>,
    {
      wrapper: TestingProvider,
    },
  );

  expect(await screen.findByText('Bitcoin')).toBeOnTheScreen();
  expect(await screen.findByText('Ethereum')).toBeOnTheScreen();
  expect(await screen.findByText('Dogecoin')).toBeOnTheScreen();
});
