import apiClient from '../../axios';
import { CoinMarket } from '../../types/CoinMarket';

export type GetCoinsMarketsPayload = {
  /**
   * target currency of coins and market data.
   * refers to https://docs.coingecko.com/reference/simple-supported-currencies.
   */
  vs_currency: string;
  /**
   * coins' ids, comma-separated if querying more than 1 coin.
   * refers to https://docs.coingecko.com/reference/coins-list.
   */
  ids?: string;
  /**
   * filter based on coins' category.
   * refers to https://docs.coingecko.com/reference/coins-categories-list.
   */
  category?: string;
  /**
   * sort result by field, default: market_cap_desc
   */
  order?: string;
  /**
   * total results per page, default: 100
   * Valid values: 1...250
   */
  per_page?: number;
  /**
   * page through results, default: 1
   */
  page?: number;
  /**
   * include sparkline 7 days data, default: false
   */
  sparkline?: boolean;
  /**
   * include price change percentage timeframe, comma-separated if query more than 1 price change percentage timeframe
   * Valid values: 1h, 24h, 7d, 14d, 30d, 200d, 1y
   */
  price_change_percentage?: string;
  /**
   * language background, default: en
   */
  locale?: string;
  /**
   * decimal place for currency price value
   */
  precision?: string;
};

export const getCoinsMarkets = async (payload: GetCoinsMarketsPayload): Promise<CoinMarket[]> => {
  const response = await apiClient.get<CoinMarket[]>('/coins/markets', {
    params: payload,
  });
  return response.data;
};
