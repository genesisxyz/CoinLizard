export type Coin = {
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
   * coin web slug
   */
  web_slug: string;
  /**
   * coin asset platform id
   */
  asset_platform_id: string;
  /**
   * coin asset platform and contract address
   */
  platforms: {
    [key: string]: string;
  };
  /**
   * detailed coin asset platform and contract address
   */
  detail_platforms: {
    [key: string]: any;
  };
  /**
   * blockchain block time in minutes
   */
  block_time_in_minutes: number;
  /**
   * blockchain hashing algorithm
   */
  hashing_algorithm: string;
  /**
   * coin categories
   */
  categories: string[];
  /**
   * preview listing coin
   */
  preview_listing: boolean;
  /**
   * public notice
   */
  public_notice: string;
  /**
   * additional notices
   */
  additional_notices: string[];
  /**
   * coin name localization
   */
  localization?: {
    [key: string]: string;
  };
  /**
   * coin description
   */
  description: {
    [key: string]: string;
  };
  /**
   * links
   */
  links: {
    /**
     * coin website url
     */
    homepage: string[];
    /**
     * coin whitepaper url
     */
    whitepaper: string[];
    /**
     * coin block explorer url
     */
    blockchain_site: string[];
    /**
     * coin official forum url
     */
    official_forum_url: string[];
    /**
     * coin chat url
     */
    chat_url: string[];
    /**
     * coin announcement url
     */
    announcement_url: string[];
    /**
     * coin twitter handle
     */
    twitter_screen_name: string;
    /**
     * coin facebook username
     */
    facebook_username: string;
    /**
     * coin bitcointalk thread identifier
     */
    bitcointalk_thread_identifier: string;
    /**
     * coin telegram channel identifier
     */
    telegram_channel_identifier: string;
    /**
     * coin subreddit url
     */
    subreddit_url: string;
    /**
     * coin repository url
     */
    repos_url: {
      /**
       * coin github repository url
       */
      github: string[];
      /**
       * coin bitbucket repository url
       */
      bitbucket: string[];
    };
  };
  /**
   * coin image url
   */
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  /**
   * coin country of origin
   */
  country_origin: string;
  /**
   * coin genesis date
   * format: yyyy-mm-dd
   */
  genesis_date: string;
  /**
   * coin sentiment votes up percentage
   */
  sentiment_votes_up_percentage: number;
  /**
   * coin sentiment votes down percentage
   */
  sentiment_votes_down_percentage: number;
  /**
   * coin rank by market cap
   */
  market_cap_rank: number;
  /**
   * coin market data
   */
  market_data: {
    /**
     * coin current price in currency
     */
    current_price: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * total value locked
     */
    total_value_locked: number;
    /**
     * market cap to total value locked ratio
     */
    mcap_to_tvl_ratio: number;
    /**
     * fully diluted valuation to total value locked ratio
     */
    fdv_to_tvl_ratio: number;
    /**
     * coin return on investment
     */
    roi: number;
    /**
     * coin all time high (ath) in currency
     */
    ath: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin all time high (ath) change in percentage
     */
    ath_change_percentage: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin all time high (ath) date
     */
    ath_date: {
      btc: string;
      eur: string;
      usd: string;
      gbp: number;
    };
    /**
     * coin all time low (atl) in currency
     */
    atl: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin all time low (atl) change in percentage
     */
    atl_change_percentage: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin all time low (atl) date
     */
    atl_date: {
      btc: string;
      eur: string;
      usd: string;
      gbp: number;
    };
    /**
     * coin market cap in currency
     */
    market_cap: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin rank by market cap
     */
    market_cap_rank: number;
    /**
     * coin fully diluted valuation (fdv) in currency
     */
    fully_diluted_valuation: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * market cap to fully diluted valuation ratio
     */
    market_cap_fdv_ratio: number;
    /**
     * coin total trading volume in currency
     */
    total_volume: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 24h price high in currency
     */
    high_24h: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 24h price low in currency
     */
    low_24h: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 24h price change in currency
     */
    price_change_24h: number;
    /**
     * coin 24h price change in percentage
     */
    price_change_percentage_24h: number;
    /**
     * coin 7d price change in percentage
     */
    price_change_percentage_7d: number;
    /**
     * coin 14d price change in percentage
     */
    price_change_percentage_14d: number;
    /**
     * coin 30d price change in percentage
     */
    price_change_percentage_30d: number;
    /**
     * coin 60d price change in percentage
     */
    price_change_percentage_60d: number;
    /**
     * coin 200d price change in percentage
     */
    price_change_percentage_200d: number;
    /**
     * coin 1y price change in percentage
     */
    price_change_percentage_1y: number;
    /**
     * coin 24h market cap change in currency
     */
    market_cap_change_24h: number;
    /**
     * coin 24h market cap change in percentage
     */
    market_cap_change_percentage_24h: number;
    /**
     * coin 1h price change in currency
     */
    price_change_percentage_1h_in_currency: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 24h price change in currency
     */
    price_change_percentage_24h_in_currency: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 7d price change in currency
     */
    price_change_percentage_7d_in_currency: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 14d price change in currency
     */
    price_change_percentage_14d_in_currency: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 30d price change in currency
     */
    price_change_percentage_30d_in_currency: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 60d price change in currency
     */
    price_change_percentage_60d_in_currency: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 200d price change in currency
     */
    price_change_percentage_200d_in_currency: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 1y price change in currency
     */
    price_change_percentage_1y_in_currency: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 24h market cap change in currency
     */
    market_cap_change_24h_in_currency: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin 24h market cap change in percentage
     */
    market_cap_change_percentage_24h_in_currency: {
      btc: number;
      eur: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin total supply
     */
    total_supply: number;
    /**
     * coin max supply
     */
    max_supply: number;
    /**
     * coin circulating supply
     */
    circulating_supply: number;
    /**
     * coin market data last updated timestamp
     */
    last_updated: string;
  };
  /**
   * coin community data
   */
  community_data?: {
    /**
     * coin facebook likes
     */
    facebook_likes: number;
    /**
     * coin twitter followers
     */
    twitter_followers: number;
    /**
     * coin reddit average posts in 48 hours
     */
    reddit_average_posts_48h: number;
    /**
     * coin reddit average comments in 48 hours
     */
    reddit_average_comments_48h: number;
    /**
     * coin reddit subscribers
     */
    reddit_subscribers: number;
    /**
     * coin reddit active accounts in 48 hours
     */
    reddit_accounts_active_48h: number;
    /**
     * coin telegram channel user count
     */
    telegram_channel_user_count: number;
  };
  /**
   * coin developer data
   */
  developer_data?: {
    /**
     * coin repository forks
     */
    forks: number;
    /**
     * coin repository stars
     */
    stars: number;
    /**
     * coin repository subscribers
     */
    subscribers: number;
    /**
     * coin repository total issues
     */
    total_issues: number;
    /**
     * coin repository closed issues
     */
    closed_issues: number;
    /**
     * coin repository pull requests merged
     */
    pull_requests_merged: number;
    /**
     * coin repository pull request contributors
     */
    pull_request_contributors: number;
    /**
     * coin code additions and deletions in 4 weeks
     */
    code_additions_deletions_4_weeks: {
      additions: number;
      deletions: number;
    };
    /**
     * coin repository commit count in 4 weeks
     */
    commit_count_4_weeks: number;
    /**
     * coin repository last 4 weeks commit activity series
     */
    last_4_weeks_commit_activity_series: number[];
  };
  /**
   * coin status updates
   */
  status_updates: object[];
  /**
   * coin last updated timestamp
   */
  last_updated: string;
  /**
   * coin tickers
   */
  tickers?: {
    /**
     * coin ticker base currency
     */
    base: string;
    /**
     * coin ticker target currency
     */
    target: string;
    /**
     * coin ticker exchange
     */
    market: {
      /**
       * coin ticker exchange name
       */
      name: string;
      /**
       * coin ticker exchange identifier
       */
      identifier: string;
      /**
       * coin ticker exchange trading incentive
       */
      has_trading_incentive: boolean;
    };
    /**
     * coin ticker last price
     */
    last: number;
    /**
     * coin ticker volume
     */
    volume: number;
    /**
     * coin ticker converted last price
     */
    converted_last: {
      btc: number;
      eth: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin ticker converted volume
     */
    converted_volume: {
      btc: number;
      eth: number;
      usd: number;
      gbp: number;
    };
    /**
     * coin ticker trust score
     */
    trust_score: string;
    /**
     * coin ticker bid ask spread percentage
     */
    bid_ask_spread_percentage: number;
    /**
     * coin ticker timestamp
     */
    timestamp: string;
    /**
     * coin ticker last traded timestamp
     */
    last_traded_at: string;
    /**
     * coin ticker last fetch timestamp
     */
    last_fetch_at: string;
    /**
     * coin ticker anomaly
     */
    is_anomaly: boolean;
    /**
     * coin ticker stale
     */
    is_stale: boolean;
    /**
     * coin ticker trade url
     */
    trade_url: string;
    /**
     * coin ticker token info url
     */
    token_info_url: string;
    /**
     * coin ticker base currency coin id
     */
    coin_id: string;
    /**
     * coin ticker target currency coin id
     */
    target_coin_id: string;
  }[];
};
