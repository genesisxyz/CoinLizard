import {
  Box,
  ChevronDownIcon,
  Divider,
  FavouriteIcon,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getCoin, GetCoinPayload } from '../api/coins/getCoin';
import Chart from '../components/Chart';
import { QuerySuspense } from '../components/QuerySuspense';
import { RootStackParamList } from '../routes';
import { useStore } from '../store';

export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen(props: DetailScreenProps) {
  return (
    <QuerySuspense>
      <Content {...props} />
    </QuerySuspense>
  );
}

function Content(props: DetailScreenProps) {
  const { route, navigation } = props;
  const { id } = route.params;

  const { _, i18n } = useLingui();

  const [currency, setCurrency] = useState<'usd' | 'eur' | 'gbp'>('usd');

  const { data } = useCoinQuery({ id });

  const isFavorite = useStore((state) => !!state.favoriteCoins.get(id));
  const addCoin = useStore((state) => state.addCoin);
  const removeCoin = useStore((state) => state.removeCoin);

  const toast = useToast();

  const [isPointerShown, setIsPointerShown] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: data.name,
      headerRight(props) {
        return (
          <Pressable
            testID="favorite-button"
            onPress={() => {
              if (isFavorite) {
                removeCoin(data.id);
                toast.show({
                  placement: 'top',
                  render: ({ id }) => {
                    const toastId = 'toast-' + id;
                    return (
                      <Toast nativeID={toastId} variant="accent" action="error">
                        <VStack space="xs">
                          <ToastTitle $lg-fontSize="$lg">{_(msg`Favorite Removed`)}</ToastTitle>
                          <ToastDescription $lg-fontSize="$lg">
                            {_(msg`Removed ${data.name} from your favorites.`)}
                          </ToastDescription>
                        </VStack>
                      </Toast>
                    );
                  },
                });
              } else {
                addCoin({
                  id: data.id,
                  name: data.name,
                  symbol: data.symbol,
                  image: data.image.large,
                  marketCapRank: data.market_data.market_cap_rank,
                });
                toast.show({
                  placement: 'top',
                  render: ({ id }) => {
                    const toastId = 'toast-' + id;
                    return (
                      <Toast nativeID={toastId} variant="accent" action="success">
                        <Pressable
                          onPress={() => {
                            navigation.navigate('FavoritesTab');
                          }}>
                          <VStack space="xs">
                            <ToastTitle $lg-fontSize="$lg">{_(msg`Favorite Added`)}</ToastTitle>
                            <ToastDescription $lg-fontSize="$lg">
                              {_(msg`Added ${data.name} to your favorites.`)}
                            </ToastDescription>
                          </VStack>
                        </Pressable>
                      </Toast>
                    );
                  },
                });
              }
            }}>
            <Icon
              as={FavouriteIcon}
              fill={isFavorite ? '$primary400' : 'transparent'}
              color={isFavorite ? '$primary400' : undefined}
            />
          </Pressable>
        );
      },
    });
  }, [navigation, addCoin, isFavorite, removeCoin, toast, _, data]);

  if (!data) {
    return null;
  }

  const currentPrice = i18n.number(data.market_data.current_price[currency], {
    currency,
    style: 'currency',
  });

  const priceChangePercentage24h = i18n.number(data.market_data.price_change_percentage_24h, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const marketCap = i18n.number(data.market_data.market_cap[currency], {
    currency,
    style: 'currency',
  });

  const tradingVolume = i18n.number(data.market_data.total_volume[currency], {
    currency,
    style: 'currency',
  });

  const circulatingSupply = i18n.number(data.market_data.circulating_supply);

  const totalSupply = i18n.number(data.market_data.total_supply);

  const allTimeHighPrice = i18n.number(data.market_data.ath[currency], {
    currency,
    style: 'currency',
  });

  const allTimeLowPrice = i18n.number(data.market_data.atl[currency], {
    currency,
    style: 'currency',
  });

  return (
    <ScrollView scrollEnabled={!isPointerShown}>
      <VStack space="lg" padding="$2">
        <HStack space="xs" alignItems="baseline">
          <Text fontSize="$4xl" $lg-fontSize="$8xl" fontWeight="$bold">
            {currentPrice}
          </Text>
          <Text
            color={data.market_data.price_change_percentage_24h > 0 ? '$green400' : '$red400'}
            fontWeight="$bold"
            fontSize="$md"
            $xl-fontSize="$2xl">
            {priceChangePercentage24h}%
          </Text>
        </HStack>
        <View>
          <Chart id={id} setIsPointerShown={setIsPointerShown} />
        </View>
        <ChooseCurrencyInput
          value={currency}
          onValueChange={(value) => {
            setCurrency(value as 'usd' | 'eur' | 'gbp');
          }}
        />
        <Box bg="$white" borderRadius="$lg">
          <MarketDataCell
            title={_(msg`Market cap rank`)}
            value={`#${data.market_data.market_cap_rank}`}
          />
          <Divider my="$0.5" />
          <MarketDataCell title={_(msg`Market cap`)} value={marketCap} />
          <Divider my="$0.5" />
          <MarketDataCell title={_(msg`24-hour trading volume`)} value={tradingVolume} />
          <Divider my="$0.5" />
          <MarketDataCell title={_(msg`Circulating supply`)} value={circulatingSupply} />
          {totalSupply && (
            <>
              <Divider my="$0.5" />
              <MarketDataCell title={_(msg`Total supply`)} value={totalSupply} />
            </>
          )}
          <Divider my="$0.5" />
          <MarketDataCell title={_(msg`All-time high price`)} value={allTimeHighPrice} />
          <Divider my="$0.5" />
          <MarketDataCell title={_(msg`All-time low price`)} value={allTimeLowPrice} />
        </Box>
      </VStack>
    </ScrollView>
  );
}

function ChooseCurrencyInput(props: { value: string; onValueChange: (value: string) => void }) {
  const { value, onValueChange } = props;

  return (
    <Select testID="select" initialLabel="USD" selectedValue={value} onValueChange={onValueChange}>
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Select option" />
        {/* TODO: this is still a bug https://github.com/gluestack/gluestack-ui/issues/1454 */}
        {/* @ts-ignore */}
        <SelectIcon mr="$3">
          <Icon as={ChevronDownIcon} />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="USD" value="usd" />
          <SelectItem testID="select-eur" label="EUR" value="eur" />
          <SelectItem label="GBP" value="gbp" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}

function MarketDataCell(props: { title: string; value: string }) {
  const { title, value } = props;

  return (
    <HStack justifyContent="space-between" padding="$4" space="sm">
      <Text
        numberOfLines={1}
        fontSize="$md"
        $xl-fontSize="$xl"
        color="$secondary400"
        flexShrink={1}>
        {title}
      </Text>
      <Text fontSize="$md" $xl-fontSize="$xl" fontWeight="$bold">
        {value}
      </Text>
    </HStack>
  );
}

function useCoinQuery(payload: GetCoinPayload) {
  const { id, ...params } = payload;
  return useSuspenseQuery({
    queryKey: ['coins', id, params],
    queryFn: async () => {
      const response = await getCoin({
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
        tickers: false,
        localization: false,
        ...payload,
      });
      return response;
    },
  });
}
