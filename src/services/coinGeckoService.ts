import axios from 'axios';
import type { Coin } from '../interfaces';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export class CoinGeckoService {
  async fetchCoins(vsCurrency: string = 'usd'): Promise<Coin[]> {
    try {
      const url = `${BASE_URL}/coins/markets`;
      const { data } = await axios.get<Coin[]>(url, {
        params: {
          vs_currency: vsCurrency,
          order: 'market_cap_desc',
          sparkline: false,
          price_change_percentage: '24h',
        },
      });
      return data;
    } catch (error) {
      console.error('Error fetching coins:', error);
      throw error;
    }
  }

  async fetchCoinById(id: string, vsCurrency: string = 'usd'): Promise<Coin> {
    try {
      const url = `${BASE_URL}/coins/markets`;
      const { data } = await axios.get<Coin[]>(url, {
        params: {
          vs_currency: vsCurrency,
          ids: id,
        },
      });

      if (!data[0]) {
        throw new Error(`Coin with id ${id} not found`);
      }

      return data[0];
    } catch (error) {
      console.error(`Error fetching coin with id ${id}:`, error);
      throw error;
    }
  }
}
