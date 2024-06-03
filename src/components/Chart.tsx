import { Text, useToken, VStack } from '@gluestack-ui/themed';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { TextStyle, useWindowDimensions, ViewStyle } from 'react-native';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';

import { getCoinOHLC, GetCoinOHLCPayload } from '../api/coins/getCoinOHLC';

export default function Chart(props: { id: string }) {
  const { id } = props;

  const { _, i18n } = useLingui();

  const primary400 = useToken('colors', 'primary400');
  const space2 = useToken('space', '2');
  const secondary400 = useToken('colors', 'secondary400');
  const bold = useToken('fontWeights', 'bold');
  const radiusMd = useToken('radii', 'md');

  const windowDimesions = useWindowDimensions();

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
      formatYLabel={(value) =>
        i18n.number(parseFloat(value), {
          currency: 'USD',
          style: 'currency',
          maximumFractionDigits: 0,
        })
      }
      adjustToWidth
      width={windowDimesions.width - space2 * 2}
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
