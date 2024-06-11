import { Box, HStack, Image, Pressable, Text, useToken, VStack } from '@gluestack-ui/themed';
import { useLingui } from '@lingui/react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, FlatListProps } from 'react-native';

import { getCoinsMarkets } from '../api/coins/getCoinsMarkets';
import { QuerySuspense } from '../components/QuerySuspense';
import { RootStackParamList } from '../routes';
import { CoinMarket } from '../types/CoinMarket';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen(props: HomeScreenProps) {
  return (
    <QuerySuspense>
      <Content {...props} />
    </QuerySuspense>
  );
}

function Content(props: HomeScreenProps) {
  const { navigation } = props;

  const { data, fetchNextPage, isFetchingNextPage } = useCoinsListWithMarketDataQuery();

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
      <Box flexDirection="row" padding="$2" $lg-padding="$4">
        <HStack space="sm" alignItems="center">
          <Text fontWeight="$bold" fontSize="$xs" $lg-fontSize="$lg" width="$4.5" $lg-width="$9">
            #
          </Text>
          <Text
            fontWeight="$bold"
            fontSize="$xs"
            $lg-fontSize="$lg"
            width="$12"
            $lg-width="$24"
            textAlign="center">
            COIN
          </Text>
          <Text fontWeight="$bold" fontSize="$xs" $lg-fontSize="$lg" width="$20" $lg-width="$40">
            PRICE
          </Text>
          <Text fontWeight="$bold" fontSize="$xs" $lg-fontSize="$lg" width="$12" $lg-width="$24">
            24H/7D
          </Text>
          <Text fontWeight="$bold" fontSize="$xs" $lg-fontSize="$lg">
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

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) {
      return null;
    }

    return (
      <Box padding="$2" justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    );
  }, [isFetchingNextPage]);

  const space2 = useToken('space', '2');

  const dataFlat = useMemo(() => {
    return data?.pages.map((page) => page).flat();
  }, [data]);

  return (
    <FlatList
      testID="coins-list"
      contentContainerStyle={{ padding: space2 }}
      ListHeaderComponent={renderHeader}
      contentInsetAdjustmentBehavior="automatic"
      data={dataFlat}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListFooterComponent={renderFooter}
      onEndReached={() => {
        fetchNextPage();
      }}
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
      <HStack space="sm" alignItems="center" flexDirection="row" padding="$2" $lg-padding="$4">
        <Text width="$4.5" $lg-width="$9" fontSize={10} numberOfLines={1}>
          {item.market_cap_rank}
        </Text>
        <VStack width="$12" $lg-width="$24" space="xs" alignItems="center">
          <Image
            alt="coin image"
            source={{ uri: item.image }}
            width={32}
            $lg-width={64}
            height={32}
            $lg-height={64}
          />
          <Text
            fontWeight="$bold"
            fontSize="$xs"
            $lg-fontSize="$lg"
            textTransform="uppercase"
            numberOfLines={1}>
            {item.symbol}
          </Text>
        </VStack>
        <Text
          width="$20"
          $lg-width="$40"
          fontWeight="$bold"
          fontSize="$xs"
          $lg-fontSize="$lg"
          numberOfLines={1}>
          {i18n.number(item.current_price, { currency: 'USD', style: 'currency' })}
        </Text>
        <VStack width="$12" $lg-width="$24">
          <Text fontWeight="$bold" fontSize="$xs" $lg-fontSize="$lg" numberOfLines={1}>
            {i18n.number(item.price_change_percentage_24h, {
              maximumFractionDigits: 1,
              minimumFractionDigits: 1,
            })}
            %
          </Text>
          {priceChangePercentage7Days !== null && (
            <Text fontWeight="$bold" fontSize="$xs" $lg-fontSize="$lg" numberOfLines={1}>
              {i18n.number(priceChangePercentage7Days, {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
              %
            </Text>
          )}
        </VStack>
        <Text fontWeight="$bold" fontSize="$xs" $lg-fontSize="$lg" numberOfLines={1} flexShrink={1}>
          {i18n.number(item.market_cap, { currency: 'USD', style: 'currency' })}
        </Text>
      </HStack>
    </Pressable>
  );
}

export const useCoinsListWithMarketDataQuery = () => {
  return useSuspenseInfiniteQuery({
    queryKey: ['coins', 'markets'],
    queryFn: async ({ pageParam }) => {
      const response = await getCoinsMarkets({
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: pageParam,
        sparkline: true,
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages, lastPageParam) => lastPageParam + 1,
    getPreviousPageParam: (firstPage, pages, firstPageParam) => firstPageParam - 1,
  });
};
