import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { QueryClient, QueryClientProvider, useSuspenseQuery } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react-native';

import { messages } from '../../locales/en/messages';
import { QuerySuspense } from '../QuerySuspense';

i18n.load({
  en: messages,
});

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.useFakeTimers();
  i18n.activate('en');
});

afterAll(() => {
  jest.useRealTimers();
  (console.error as jest.Mock).mockRestore();
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

const Component = () => {
  useSuspenseQuery({
    queryKey: ['test'],
    queryFn: jest.fn().mockRejectedValue(new Error('Test')),
  });

  return <Text>Test</Text>;
};

describe('QuerySuspense', () => {
  it('should render Retry button', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider config={config}>
          <QuerySuspense>
            <Component />
          </QuerySuspense>
        </GluestackUIProvider>
      </QueryClientProvider>,
      {
        wrapper: TestingProvider,
      },
    );

    expect(await screen.findByText('Retry')).toBeOnTheScreen();
  });
});
