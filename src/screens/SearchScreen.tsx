import {
  Box,
  Divider,
  HStack,
  Image,
  Pressable,
  Text,
  useToken,
  VStack,
} from '@gluestack-ui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { SearchBarCommands } from 'react-native-screens';

import { getSearch, GetSearchPayload } from '../api/search/getSearch';
import { Loading } from '../components/Loading';
import { QuerySuspense } from '../components/QuerySuspense';
import { useDebounce } from '../hooks/useDebounce';
import { RootStackParamList } from '../routes';
import { Search } from '../types/Search';

export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen(props: SearchScreenProps) {
  return (
    <QuerySuspense>
      <Content {...props} />
    </QuerySuspense>
  );
}

function Content(props: SearchScreenProps) {
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
          <Box flexDirection="row" padding={2}>
            <HStack space="md" alignItems="center" flexDirection="row" padding="$2">
              <Text width="$5" fontSize={10}>
                {item.market_cap_rank}
              </Text>
              <VStack width="$16" space="xs" alignItems="center">
                <Image alt="coin image" source={{ uri: item.large }} width={32} height={32} />
                <Text fontWeight="$bold" fontSize="$xs" textTransform="uppercase">
                  {item.symbol}
                </Text>
              </VStack>
              <Text fontWeight="$bold" fontSize="$sm">
                {item.name}
              </Text>
            </HStack>
          </Box>
        </Pressable>
      );
    },
    [openDetail],
  );

  const renderSeparator = useCallback(() => {
    return <Divider my="$0.5" />;
  }, []);

  const space2 = useToken('space', '2');

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, padding: space2 }}
      ListEmptyComponent={isFetching ? <Loading /> : undefined}
      contentInsetAdjustmentBehavior="automatic"
      data={isFetching ? undefined : data?.coins}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
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
    throwOnError: true,
  });
};
