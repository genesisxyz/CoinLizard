import { Box, HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../routes';
import { FavoriteCoin } from '../types/FavoriteCoin';

export type CoinListItemProps = FavoriteCoin;

export function CoinListItem(props: CoinListItemProps) {
  const { id, name, symbol, image, marketCapRank } = props;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPress = () => {
    navigation.navigate('Detail', { id });
  };

  return (
    <Pressable testID={`list-item-${id}`} onPress={onPress}>
      <Box flexDirection="row" padding="$2" $lg-padding="$4">
        <HStack space="md" alignItems="center" flexDirection="row" padding="$2" flex={1}>
          <Text $lg-width="$16" width="$8" fontSize="$xs" $lg-fontSize="$lg" numberOfLines={1}>
            {marketCapRank}
          </Text>
          <VStack $lg-width="$32" width="$16" space="xs" alignItems="center">
            <Image
              testID="coin-image"
              alt="coin image"
              source={{ uri: image }}
              $lg-width={64}
              width={32}
              $lg-height={64}
              height={32}
            />
            <Text
              fontWeight="$bold"
              fontSize="$xs"
              $lg-fontSize="$lg"
              textTransform="uppercase"
              numberOfLines={1}>
              {symbol}
            </Text>
          </VStack>
          <Text
            fontWeight="$bold"
            fontSize="$sm"
            $lg-fontSize="$lg"
            numberOfLines={1}
            flexShrink={1}>
            {name}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
}
