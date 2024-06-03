import apiClient from '../../axios';

export type GetCoinOHLCPayload = {
  /**
   * coin id
   * refers to https://docs.coingecko.com/reference/coins-list.
   */
  id: string;
  /**
   * target currency of price data
   * refers to https://docs.coingecko.com/reference/simple-supported-currencies.
   */
  vs_currency: string;
  /**
   * data up to number of days ago
   */
  days: number;
  /**
   * data interval, leave empty for auto granularity
   */
  interval?: string;
  /**
   * decimal place for currency price value
   */
  precision?: string;
};

export const getCoinOHLC = async (payload: GetCoinOHLCPayload) => {
  const { id, ...params } = payload;
  const response = await apiClient.get<[number, number, number, number, number][]>(
    `/coins/${id}/ohlc`,
    {
      params,
    },
  );
  return response.data;
};
