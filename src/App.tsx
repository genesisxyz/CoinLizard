import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { i18n } from '@lingui/core';
import { I18nProvider, TransRenderProps } from '@lingui/react';
import { NavigationContainer } from '@react-navigation/native';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import RootNavigator from './navigators/RootNavigator';
import { asyncPersister, queryClient } from './queryClient';

const DefaultComponent = (props: TransRenderProps) => {
  return <Text>{props.children}</Text>;
};

export default function App() {
  return (
    <I18nProvider i18n={i18n} defaultComponent={DefaultComponent}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: asyncPersister,
          maxAge: Infinity,
          dehydrateOptions: {
            shouldDehydrateMutation(mutation) {
              return true;
            },
            shouldDehydrateQuery(query) {
              return true;
            },
          },
        }}
        onSuccess={() => {
          queryClient.resumePausedMutations().then(() => {
            queryClient.invalidateQueries();
          });
        }}>
        <GluestackUIProvider config={config}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </GestureHandlerRootView>
        </GluestackUIProvider>
      </PersistQueryClientProvider>
    </I18nProvider>
  );
}
