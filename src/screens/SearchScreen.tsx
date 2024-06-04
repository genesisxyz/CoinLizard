import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, FlatListProps } from 'react-native';
import { SearchBarCommands } from 'react-native-screens';

import { getSearch, GetSearchPayload } from '../api/search/getSearch';
import { useDebounce } from '../hooks/useDebounce';
import { RootStackParamList } from '../routes';
import { Search } from '../types/Search';

export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen(props: SearchScreenProps) {
  const { navigation } = props;

  const [search, setSearch] = useState('');

  const searchDebounced = useDebounce(search, 300);

  const { data, isFetching } = useSearchQuery(
    { query: searchDebounced },
    { enabled: !!searchDebounced },
  );

  const searchBarRef = useRef<SearchBarCommands>(null);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ref: searchBarRef,
        autoFocus: true,
        placement: 'stacked',
        placeholder: 'Search coins',
        onChangeText(e) {
          setSearch(e.nativeEvent.text);
        },
        onCancelButtonPress(e) {
          navigation.goBack();
        },
      },
    });
  }, [navigation]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchBarRef.current?.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const openDetail = useCallback(
    (id: string) => {
      navigation.navigate('Detail', { id });
    },
    [navigation],
  );

  const renderItem = useCallback<NonNullable<FlatListProps<Search['coins'][number]>['renderItem']>>(
    (info) => {
      const { item } = info;

      return (
        <Pressable
          onPress={() => {
            openDetail(item.id);
          }}>
          <Box flexDirection="row" padding={2} borderBottomWidth={1} borderBottomColor="gray.200">
            <Text>{item.market_cap_rank}</Text>
            <Text>{item.symbol}</Text>
            <Text>{item.name}</Text>
          </Box>
        </Pressable>
      );
    },
    [openDetail],
  );

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      ListEmptyComponent={
        isFetching ? (
          <Box flex={1} alignItems="center" justifyContent="center">
            <ActivityIndicator />
          </Box>
        ) : undefined
      }
      contentInsetAdjustmentBehavior="automatic"
      data={isFetching ? undefined : data?.coins}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export const useSearchQuery = (payload: GetSearchPayload, options: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['search', payload],
    queryFn: async () => {
      const response = await getSearch(payload);
      return response;
    },
    enabled: options.enabled,
  });
};
