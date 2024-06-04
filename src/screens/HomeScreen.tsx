import { Box, HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed';
import { useLingui } from '@lingui/react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { FlatList, FlatListProps } from 'react-native';

import { getCoinsMarkets } from '../api/coins/getCoinsMarkets';
import { RootStackParamList } from '../routes';
import { CoinMarket } from '../types/CoinMarket';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen(props: HomeScreenProps) {
  const { navigation } = props;

  const { data } = useCoinsListWithMarketDataQuery();

  useEffect(() => {
    navigation.setOptions({
      headerRight(props) {
        return (
          <Pressable
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Text>Search</Text>
          </Pressable>
        );
      },
    });
  }, [navigation]);

  const renderHeader = useCallback(() => {
    return (
      <Box flexDirection="row" padding="$2">
        <HStack space="sm" alignItems="center">
          <Text fontWeight="$bold" fontSize="$xs" width="$4.5">
            #
          </Text>
          <Text fontWeight="$bold" fontSize="$xs" width="$12">
            COIN
          </Text>
          <Text fontWeight="$bold" fontSize="$xs" width="$20">
            PRICE
          </Text>
          <Text fontWeight="$bold" fontSize="$xs" width="$12">
            24H/7D
          </Text>
          <Text fontWeight="$bold" fontSize="$xs">
            MARKET CAP
          </Text>
        </HStack>
      </Box>
    );
  }, []);

  const renderItem = useCallback<NonNullable<FlatListProps<CoinMarket>['renderItem']>>((info) => {
    const { item } = info;

    return <CoinCellItem item={item} />;
  }, []);

  const space2 = useToken('space', '2');

  return (
    <FlatList
      contentContainerStyle={{ padding: space2 }}
      ListHeaderComponent={renderHeader}
      contentInsetAdjustmentBehavior="automatic"
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

function CoinCellItem(props: { item: CoinMarket }) {
  const { item } = props;

  const { i18n } = useLingui();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Detail'>>();

  const priceChangePercentage7Days = useMemo<number | null>(() => {
    if (!item.sparkline_in_7d) return null;
    const firstSparklineData = item.sparkline_in_7d.price[0];
    const lastSparklineData = item.sparkline_in_7d.price[item.sparkline_in_7d.price.length - 1];

    return ((lastSparklineData - firstSparklineData) / firstSparklineData) * 100;
  }, [item.sparkline_in_7d]);

  const onPress = useCallback(() => {
    navigation.navigate('Detail', { id: item.id });
  }, [item.id, navigation]);

  return (
    <Pressable onPress={onPress}>
      <Box flexDirection="row" padding="$2">
        <HStack space="sm" alignItems="center">
          <Text width="$4.5" fontSize={10}>
            {item.market_cap_rank}
          </Text>
          <VStack width="$12" space="xs" alignItems="center">
            <Image alt="coin image" source={{ uri: item.image }} width={32} height={32} />
            <Text fontWeight="$bold" fontSize="$xs" textTransform="uppercase">
              {item.symbol}
            </Text>
          </VStack>
          <Text width="$20" fontWeight="$bold" fontSize="$xs" numberOfLines={1}>
            {i18n.number(item.current_price, { currency: 'USD', style: 'currency' })}
          </Text>
          <VStack width="$12">
            <Text fontWeight="$bold" fontSize="$xs" numberOfLines={1}>
              {i18n.number(item.price_change_percentage_24h, {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
              %
            </Text>
            {priceChangePercentage7Days !== null && (
              <Text fontWeight="$bold" fontSize="$xs" numberOfLines={1}>
                {i18n.number(priceChangePercentage7Days, {
                  maximumFractionDigits: 1,
                  minimumFractionDigits: 1,
                })}
                %
              </Text>
            )}
          </VStack>
          <Text fontWeight="$bold" fontSize="$xs" numberOfLines={1}>
            {i18n.number(item.market_cap, { currency: 'USD', style: 'currency' })}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
}

export const useCoinsListWithMarketDataQuery = () => {
  return useQuery({
    queryKey: ['coins', 'markets'],
    queryFn: async () => {
      const response = await getCoinsMarkets({
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: true,
      });
      return response;
    },
  });
};
