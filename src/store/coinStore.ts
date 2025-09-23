import type { Coin } from './../interfaces/index';
import { defineStore } from 'pinia';
import { CoinGeckoService } from '../services/coinGeckoService';
import { formatPriceHistoricalData } from '../utils/helpers';

const coinGeckoService = new CoinGeckoService();

export const useCoinStore = defineStore('coin', {
  state: () => ({
    coins: [] as Coin[],
    selectedCoin: {} as Coin | null,
    loading: false as Boolean,
    historical: {} as any,
  }),
  actions: {
    async fetchCoins() {
      this.loading = true;
      try {
        const response = await coinGeckoService.fetchAllCoins();
        this.coins = response;
      } catch (error) {
        return error;
      } finally {
        this.loading = false;
      }
    },
    async fetchCoinDetails(coinId: string): Promise<Coin | any> {
      this.loading = true;
      try {
        const response = await coinGeckoService.fetchCoinById(coinId);
        this.selectedCoin = response;
        return response;
      } catch (error) {
        return error;
      } finally {
        this.loading = false;
      }
    },
    toggleFavorite(coinId: string) {
      let favoriteCoins = localStorage.getItem('favoriteCoins');
      if (favoriteCoins) {
        const parsedFavorites = JSON.parse(favoriteCoins);
        if (Array.isArray(parsedFavorites) && parsedFavorites.includes(coinId)) {
          const updatedFavorites = parsedFavorites.filter((id: string) => id !== coinId);
          localStorage.setItem('favoriteCoins', JSON.stringify(updatedFavorites));
          return;
        }

        const updatedFavorites = Array.isArray(parsedFavorites) ? [...parsedFavorites, coinId] : [coinId];
        localStorage.setItem('favoriteCoins', JSON.stringify(updatedFavorites));
      }
    },
    getFavoriteCoins() {
      const favoriteCoins = localStorage.getItem('favoriteCoins');
      let favoriteIds: string[] = [];
      if (favoriteCoins) {
        favoriteIds = JSON.parse(favoriteCoins) as string[];
      }

      return this.coins.filter(coin => favoriteIds.includes(coin.id));
    },
    isFavorite(coinId: string): boolean {
      const favoriteCoins = localStorage.getItem('favoriteCoins');
      if (!favoriteCoins) return false;

      const parsedFavorites = JSON.parse(favoriteCoins);
      if (!Array.isArray(parsedFavorites)) return false;

      return parsedFavorites.some(favId => favId === coinId);
    },
    async fetchHistoricalData(coinId: string): Promise<any> {
      this.loading = true;
      try {
        const response = await coinGeckoService.fetchHistoricalById(coinId);
        this.historical = formatPriceHistoricalData(response);
      } catch (error) {
        return error;
      } finally {
        this.loading = false;
      }
    }
  },
});