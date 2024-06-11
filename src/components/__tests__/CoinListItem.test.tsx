import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { NavigationContainer } from '@react-navigation/native';
import { act, render, screen } from '@testing-library/react-native';

import { messages } from '../../locales/en/messages';
import { CoinListItem } from '../CoinListItem';

i18n.load({
  en: messages,
});

const TestingProvider = ({ children }: any) => <I18nProvider i18n={i18n}>{children}</I18nProvider>;

describe('CoinListItem', () => {
  it('renders correctly', async () => {
    act(() => {
      i18n.activate('en');
    });

    render(
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <CoinListItem id="btc" image="" marketCapRank={1} name="Bitcoin" symbol="BTC" />
        </NavigationContainer>
      </GluestackUIProvider>,
      {
        wrapper: TestingProvider,
      },
    );

    // rank
    expect(await screen.findByText('1')).toBeOnTheScreen();

    // name
    expect(await screen.findByText('Bitcoin')).toBeOnTheScreen();

    // findByRole is not working for Image component so we are using findByTestId
    // expect(await screen.findByRole('img', { name: 'coin image' })).toBeOnTheScreen();
    // image
    expect(await screen.findByTestId('coin-image')).toBeOnTheScreen();

    // symbol
    expect(await screen.findByText('BTC')).toBeOnTheScreen();
  });
});
