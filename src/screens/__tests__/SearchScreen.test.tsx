import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import * as React from 'react';

import { messages } from '../../locales/en/messages';
import { RootStackParamList } from '../../routes';
import SearchScreen from '../SearchScreen';

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

jest.mock('../../api/search/getSearch', () => {
  const module = jest.requireActual('../../api/search/getSearch');

  module.getSearch = jest.fn().mockResolvedValue([]);

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

describe('SearchScreen', () => {
  it('should call getSearch on search', async () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    render(
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Search" component={SearchScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </GluestackUIProvider>
      </QueryClientProvider>,
      {
        wrapper: TestingProvider,
      },
    );

    // TODO: Implement test
  });
});
