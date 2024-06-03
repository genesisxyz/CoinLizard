export type CoinMarket = {
  /**
   * coin id
   */
  id: string;
  /**
   * coin symbol
   */
  symbol: string;
  /**
   * coin name
   */
  name: string;
  /**
   * coin image url
   */
  image: string;
  /**
   * coin current price in currency
   */
  current_price: number;
  /**
   * coin market cap in currency
   */
  market_cap: number;
  /**
   * coin rank by market cap
   */
  market_cap_rank: number;
  /**
   * coin fully diluted valuation (fdv) in currency
   */
  fully_diluted_valuation: number;
  /**
   * coin total trading volume in currency
   */
  total_volume: number;
  /**
   * coin 24h price high in currency
   */
  high_24h: number;
  /**
   * coin 24h price low in currency
   */
  low_24h: number;
  /**
   * coin 24h price change in currency
   */
  price_change_24h: number;
  /**
   * coin 24h price change in percentage
   */
  price_change_percentage_24h: number;
  /**
   * market_cap_change_24h
   */
  market_cap_change_24h: number;
  /**
   * coin 24h market cap change in percentage
   */
  market_cap_change_percentage_24h: number;
  /**
   * coin circulating supply
   */
  circulating_supply: number;
  /**
   * coin total supply
   */
  total_supply: number;
  /**
   * coin max supply
   */
  max_supply: number;
  /**
   * coin all time high (ath) in currency
   */
  ath: number;
  /**
   * coin all time high (ath) change in percentage
   */
  ath_change_percentage: number;
  /**
   * coin all time high (ath) date
   */
  // TODO: WHAT IS THE FORMAT?
  ath_date: string;
  /**
   * coin all time high (ath) date
   */
  atl: number;
  /**
   * coin all time low (atl) change in percentage
   */
  atl_change_percentage: number;
  /**
   * coin all time low (atl) date
   */
  // TODO: WHAT IS THE FORMAT?
  atl_date: string;
  roi: string;
  /**
   * coin last updated timestamp
   */
  last_updated: string;
  /**
   * coin 1h price change in percentage
   */
  price_change_percentage_1h: number;
  /**
   * coin price sparkline in 7 days
   */
  sparkline_in_7d?: {
    price: number[];
  };
};
