import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { FlatList, FlatListProps } from 'react-native';

import { CoinListItem } from '../components/CoinListItem';
import { QuerySuspense } from '../components/QuerySuspense';
import { RootStackParamList } from '../routes';
import { useStore } from '../store';
import { FavoriteCoin } from '../types/FavoriteCoin';

export type FavoritesScreenProps = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export default function FavoritesScreen(props: FavoritesScreenProps) {
  return (
    <QuerySuspense>
      <Content {...props} />
    </QuerySuspense>
  );
}

function Content(props: FavoritesScreenProps) {
  const favoriteCoins = useStore((state) => Array.from(state.favoriteCoins.values()));

  const renderItem = useCallback<NonNullable<FlatListProps<FavoriteCoin>['renderItem']>>((info) => {
    const { item } = info;

    const { id, name, marketCapRank, image, symbol } = item;

    return (
      <CoinListItem
        id={id}
        name={name}
        marketCapRank={marketCapRank}
        image={image}
        symbol={symbol}
      />
    );
  }, []);

  return <FlatList data={favoriteCoins} renderItem={renderItem} keyExtractor={(item) => item.id} />;
}
