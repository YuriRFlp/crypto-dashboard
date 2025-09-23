import axios from 'axios';
import type { Coin } from '../interfaces';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export class CoinGeckoService {
  async fetchAllCoins(vsCurrency: string = 'brl'): Promise<Coin[]> {
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

  async fetchCoinById(id: string, vsCurrency: string = 'brl'): Promise<Coin | any> {
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
      return error;
    }
  }

  async fetchHistoricalById(id: string, vsCurrency: string = 'brl'): Promise<any> {
    try {
      const url = `${BASE_URL}/coins/${id}/market_chart`;
      const { data } = await axios.get(url, {
        params: {
          vs_currency: vsCurrency,
          days: 30,
        },
      });

      return data;
    } catch (error) {
      console.error(`Error fetching data with id ${id}:`, error);
      return error;
    }
  }
}
