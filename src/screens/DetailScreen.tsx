import {
  Box,
  ChevronDownIcon,
  Divider,
  HStack,
  Icon,
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
  VStack,
} from '@gluestack-ui/themed';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getCoin, GetCoinPayload } from '../api/coins/getCoin';
import Chart from '../components/Chart';
import { RootStackParamList } from '../routes';

export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen(props: DetailScreenProps) {
  const { route, navigation } = props;
  const { id } = route.params;

  const { _, i18n } = useLingui();

  const [currency, setCurrency] = useState<'usd' | 'eur' | 'gbp'>('usd');

  const { data } = useCoinQuery({ id });

  useEffect(() => {
    navigation.setOptions({
      title: data?.name,
    });
  }, [navigation, data?.name]);

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
    <VStack space="lg" padding="$2">
      <HStack space="xs" alignItems="baseline">
        <Text fontSize="$4xl" fontWeight="$bold">
          {currentPrice}
        </Text>
        <Text
          color={data.market_data.price_change_percentage_24h > 0 ? '$green400' : '$red400'}
          fontWeight="$bold">
          {priceChangePercentage24h}%
        </Text>
      </HStack>
      <Chart id={id} />
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
  );
}

function ChooseCurrencyInput(props: { value: string; onValueChange: (value: string) => void }) {
  const { value, onValueChange } = props;

  return (
    <Select initialLabel="USD" selectedValue={value} onValueChange={onValueChange}>
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
          <SelectItem label="EUR" value="eur" />
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
      <Text numberOfLines={1} fontSize="$md" color="$secondary400" flexShrink={1}>
        {title}
      </Text>
      <Text fontSize="$md" fontWeight="$bold">
        {value}
      </Text>
    </HStack>
  );
}

function useCoinQuery(payload: GetCoinPayload) {
  const { id, ...params } = payload;
  return useQuery({
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
