export type Search = {
  coins: {
    /**
     * coin id
     */
    id: string;
    /**
     * coin name
     */
    name: string;
    /**
     * coin api symbol
     */
    api_symbol: string;
    /**
     * coin symbol
     */
    symbol: string;
    /**
     * coin market cap rank
     */
    market_cap_rank: number;
    /**
     * coin thumb image url
     */
    thumb: string;
    /**
     * coin large image url
     */
    large: string;
  }[];
  exchanges: {
    /**
     * exchange id
     */
    id: string;
    /**
     * exchange name
     */
    name: string;
    /**
     * exchange market type
     */
    market_type: string;
    /**
     * exchange thumb image url
     */
    thumb: string;
    /**
     * exchange large image url
     */
    large: string;
  }[];
  icos: string[];
  categories: {
    /**
     * category id
     */
    id: string;
    /**
     * category name
     */
    name: string;
  }[];
  nfts: {
    /**
     * nft collection id
     */
    id: string;
    /**
     * nft name
     */
    name: string;
    /**
     * nft collection symbol
     */
    symbol: string;
    /**
     * nft collection thumb image url
     */
    thumb: string;
  }[];
};
