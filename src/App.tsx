import { i18n } from '@lingui/core';
import { I18nProvider, TransRenderProps } from '@lingui/react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Text } from 'react-native';

import HomeStack from './navigators/HomeStack';

const queryClient = new QueryClient();

const DefaultComponent = (props: TransRenderProps) => {
  return <Text>{props.children}</Text>;
};

export default function App() {
  return (
    <I18nProvider i18n={i18n} defaultComponent={DefaultComponent}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </QueryClientProvider>
    </I18nProvider>
  );
}
