export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  low_24h: number;
  high_24h: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap_change_percentage_24h: number;
  roi: { percentage: number } | null;
}

export interface Column {
  key: string;
  prop?: string;
  label: string;
  width?: string;
  minWidth?: string;
  align?: 'left' | 'center' | 'right';
  slot?: string;
}

export interface MarketChartResponse {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}
