import { Text } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native';

import { QuerySuspense } from '../components/QuerySuspense';
import { RootStackParamList } from '../routes';
import { useStore } from '../store';

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

  return (
    <FlatList
      data={favoriteCoins}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={(item) => item.id}
    />
  );
}
