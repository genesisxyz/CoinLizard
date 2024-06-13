import { Divider, KeyboardAvoidingView, useToken } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  FlatListProps,
  Keyboard,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInputFocusEventData,
  TouchableWithoutFeedback,
} from 'react-native';
import { SearchBarCommands } from 'react-native-screens';

import { getSearch, GetSearchPayload } from '../api/search/getSearch';
import { CoinListItem } from '../components/CoinListItem';
import { Loading } from '../components/Loading';
import { QuerySuspense } from '../components/QuerySuspense';
import { useDebounce } from '../hooks/useDebounce';
import { RootStackParamList } from '../routes';
import { Search } from '../types/Search';

export type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function SearchScreen(props: SearchScreenProps) {
  return (
    <QuerySuspense>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Content {...props} />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </QuerySuspense>
  );
}

function Content(props: SearchScreenProps) {
  const search = useSearchBar();

  const searchDebounced = useDebounce(search, 300);

  const { data, isFetching } = useSearchQuery(
    { query: searchDebounced },
    { enabled: !!searchDebounced },
  );

  const renderItem = useCallback<NonNullable<FlatListProps<Search['coins'][number]>['renderItem']>>(
    (info) => {
      const { item } = info;

      const { id, name, market_cap_rank, large, symbol } = item;

      return (
        <CoinListItem
          id={id}
          name={name}
          marketCapRank={market_cap_rank}
          image={large}
          symbol={symbol}
        />
      );
    },
    [],
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

const useSearchBar = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [search, setSearch] = useState('');

  const searchBarRef = useRef<SearchBarCommands>(null);

  useEffect(() => {
    const onChangeText = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setSearch(e.nativeEvent.text);
    };

    const onCancelButtonPress = () => {
      navigation.goBack();
    };

    navigation.setOptions({
      headerSearchBarOptions: {
        ref: searchBarRef,
        autoFocus: true, // Android only
        placement: 'stacked',
        placeholder: 'Search coins',
        onChangeText,
        onCancelButtonPress,
      },
    });
  }, [navigation]);

  // Focus the search bar after the screen is mounted
  useEffect(() => {
    const timeout = setTimeout(() => {
      searchBarRef.current?.focus();
    }, 100); // TODO: should wait for react-navigation to finish animating the screen

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return search;
};

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
