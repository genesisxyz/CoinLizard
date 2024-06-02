import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { getCoinsMarkets } from '../api/coins/getCoinsMarkets';
import { RootStackParamList } from '../routes';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen(props: HomeScreenProps) {
  const { data } = useCoinsListWithMarketDataQuery();

  console.log(data?.map((e) => e.name));

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
