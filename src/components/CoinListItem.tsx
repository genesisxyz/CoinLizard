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
    <Pressable onPress={onPress}>
      <Box flexDirection="row" padding={2}>
        <HStack space="md" alignItems="center" flexDirection="row" padding="$2">
          <Text width="$5" fontSize={10}>
            {marketCapRank}
          </Text>
          <VStack width="$16" space="xs" alignItems="center">
            <Image alt="coin image" source={{ uri: image }} width={32} height={32} />
            <Text fontWeight="$bold" fontSize="$xs" textTransform="uppercase">
              {symbol}
            </Text>
          </VStack>
          <Text fontWeight="$bold" fontSize="$sm">
            {name}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
}
