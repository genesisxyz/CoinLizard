import apiClient from '../../axios';
import { Coin } from '../../types/Coin';

export type GetCoinPayload = {
  /**
   * coin id
   * refers to https://docs.coingecko.com/reference/coins-list.
   */
  id: string;
  /**
   * include all the localized languages in the response, default: true
   */
  localization?: boolean;
  /**
   * include tickers data, default: true
   */
  tickers?: boolean;
  /**
   * include market data, default: true
   */
  market_data?: boolean;
  /**
   * include community data, default: true
   */
  community_data?: boolean;
  /**
   * include developer data, default: true
   */
  developer_data?: boolean;
  /**
   * include sparkline 7 days data, default: false
   */
  sparkline?: boolean;
};

export const getCoin = async (payload: GetCoinPayload) => {
  const { id, ...params } = payload;
  const response = await apiClient.get<Coin>(`/coins/${id}`, {
    params,
  });
  return response.data;
};
