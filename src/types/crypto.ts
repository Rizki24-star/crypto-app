export type CryptoResponse = {
  data: {
    stats: Stats;
    coins: Coin[];
  };
};

export type Stats = {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
};

export type Coin = {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  btcPrice: string;
  listedAt: number;
  change: string;
  rank: number;
};

export type CryptoDetails = {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  "24hVolume": string;
  marketCap: string;
  price: string;
  btcPrice: string;
  change: string;
  rank: number;
  numberOfMarkets: number;
  numberOfExchanges: number;
  links: Link[];
  supply: {
    confirmed: boolean;
    circulating: string;
    total: string;
  };
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
  coinrankingUrl: string;
};

type Link = {
  name: string;
  type: string;
  url: string;
};

export type CoinHistory = {
  change: string;
  history: {
    price: string;
    timestamp: number;
  }[];
};
