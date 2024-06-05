import {
  Button,
  ButtonText,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import React, { PropsWithChildren, useEffect } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import { Loading } from './Loading';

export type QuerySuspenseProps = PropsWithChildren<object>;

export const QuerySuspense: React.FC<QuerySuspenseProps> = (props) => {
  const { children } = props;

  const Fallback = () => {
    return <Loading />;
  };

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallbackRender={(props) => <ErrorRetry {...props} />} onReset={reset}>
          <React.Suspense fallback={<Fallback />}>{children}</React.Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

function ErrorRetry(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;

  const { _ } = useLingui();

  const { show } = useToast();

  useEffect(() => {
    if (error) {
      show({
        render: ({ id }) => {
          const toastId = 'toast-' + id;
          return (
            <Toast nativeID={toastId} variant="solid" action="error">
              <VStack space="xs">
                <ToastTitle $lg-fontSize="$lg">{_(msg`Failed to fetch data`)}</ToastTitle>
                <ToastDescription $lg-fontSize="$lg">
                  {_(msg`Failed to fetch data, please try again later.`)}
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    }
  }, [_, error, show]);

  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <Button
        onPress={() => {
          resetErrorBoundary();
        }}>
        <ButtonText $xl-fontSize="$xl">{_(msg`Retry`)}</ButtonText>
      </Button>
    </View>
  );
}
