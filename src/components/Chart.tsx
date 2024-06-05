import { Text, useToken, VStack } from '@gluestack-ui/themed';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';

import { getCoinOHLC, GetCoinOHLCPayload } from '../api/coins/getCoinOHLC';
import { useWindowWidth } from '../hooks/useWindowWidth';

export type ChartProps = {
  id: string;
  // https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/issues/287#issuecomment-1885884042
  setIsPointerShown: (isPointerShown: boolean) => void;
};

export default function Chart(props: ChartProps) {
  const { id, setIsPointerShown } = props;

  const { _, i18n } = useLingui();

  const primary400 = useToken('colors', 'primary400');
  const space2 = useToken('space', '2');
  const secondary400 = useToken('colors', 'secondary400');
  const bold = useToken('fontWeights', 'bold');
  const radiusMd = useToken('radii', 'md');

  const windowWidth = useWindowWidth();

  const width = useMemo(() => {
    return windowWidth - space2 * 2;
  }, [space2, windowWidth]);

  const { data } = useCoinOHLCQuery({
    id,
    days: 30,
    vs_currency: 'usd',
  });

  const lineDataItems = data.map<lineDataItem>(([timestamp, open, high, low, closed], index) => {
    return {
      value: closed,
      extra: [timestamp, open, high, low, closed],
      index,
    };
  });

  const yAxisOffset =
    lineDataItems.map(({ value }) => value).reduce((acc, cur) => Math.min(acc, cur), Infinity) || 0;

  return (
    <LineChart
      disableScroll
      data={lineDataItems}
      noOfSections={5}
      color={primary400}
      xAxisThickness={0}
      yAxisOffset={yAxisOffset}
      isAnimated
      hideDataPoints
      focusEnabled
      adjustToWidth
      formatYLabel={(value) =>
        i18n.number(parseFloat(value), {
          currency: 'USD',
          style: 'currency',
          maximumFractionDigits: 0,
        })
      }
      width={width}
      yAxisTextStyle={{ fontWeight: bold, color: secondary400 } as TextStyle}
      yAxisLabelContainerStyle={{ justifyContent: 'flex-start', width: 'auto' } as ViewStyle}
      yAxisColor={'transparent'}
      yAxisLabelWidth={0}
      pointerConfig={{
        pointerStripColor: secondary400,
        pointerStripWidth: 2,
        strokeDashArray: [2, 5],
        pointerColor: secondary400,
        radius: radiusMd,
        pointerLabelWidth: 150,
        pointerLabelHeight: 120,
        stripBehindBars: true,
        stripOverPointer: true,
        showPointerStrip: true,
        pointerLabelComponent([{ value, extra, index }]: {
          value: lineDataItem['value'];
          extra: any;
          index: number;
        }[]) {
          const [timestamp, open, high, low, closed] = extra;

          return (
            <VStack
              top={80 /* TODO: there is a negative padding added from the library */}
              left={index > lineDataItems.length / 2 ? '-100%' : 20}
              bg="$black"
              opacity={0.8}
              borderRadius="$md"
              justifyContent="center"
              padding="$2"
              space="xs">
              <Text color="$white" fontSize="$xs" fontWeight="$bold">
                {i18n.date(new Date(timestamp), {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </Text>
              <Text color="$white" fontSize="$xs" fontWeight="$bold">
                {i18n.date(new Date(timestamp), {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <Text color="$coolGray400" fontSize="$xs" numberOfLines={1}>
                {_(msg`Open: ${i18n.number(open, { currency: 'USD', style: 'currency' })}`)}
              </Text>
              <Text color="$coolGray400" fontSize="$xs" numberOfLines={1}>
                {_(msg`High: ${i18n.number(high, { currency: 'USD', style: 'currency' })}`)}
              </Text>
              <Text color="$coolGray400" fontSize="$xs" numberOfLines={1}>
                {_(msg`Low: ${i18n.number(low, { currency: 'USD', style: 'currency' })}`)}
              </Text>
              <Text color="$coolGray400" fontSize="$xs" numberOfLines={1}>
                {_(msg`Close: ${i18n.number(closed, { currency: 'USD', style: 'currency' })}`)}
              </Text>
            </VStack>
          );
        },
      }}
      getPointerProps={({ pointerIndex }: { pointerIndex: number }) =>
        setIsPointerShown(pointerIndex !== -1)
      }
    />
  );
}

function useCoinOHLCQuery(payload: GetCoinOHLCPayload) {
  const { id, ...params } = payload;
  return useSuspenseQuery({
    queryKey: ['coins', id, 'ohlc', params],
    queryFn: async () => {
      const response = await getCoinOHLC(payload);
      return response;
    },
  });
}
