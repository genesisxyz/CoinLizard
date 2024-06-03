import { Box, Text } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { FlatList, FlatListProps } from 'react-native';

import { getCoinsMarkets } from '../api/coins/getCoinsMarkets';
import { RootStackParamList } from '../routes';
import { CoinMarket } from '../types/CoinMarket';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen(props: HomeScreenProps) {
  const { data } = useCoinsListWithMarketDataQuery();

  const renderItem = useCallback<NonNullable<FlatListProps<CoinMarket>['renderItem']>>((info) => {
    const { item } = info;

    return (
      <Box flexDirection="row" padding={16} borderBottomWidth={1} borderBottomColor="gray.200">
        <Text>{item.name}</Text>
      </Box>
    );
  }, []);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
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
        sparkline: false,
      });
      return response;
    },
  });
};
