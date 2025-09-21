import type { Coin } from './../interfaces/index';
import { defineStore } from 'pinia';
import { CoinGeckoService } from '../services/coinGeckoService';

const coinGeckoService = new CoinGeckoService();

export const useCoinStore = defineStore('coin', {
  state: () => ({
    coins: [] as Coin[],
    favorites: [] as string[],
    selectedCoin: {} as Coin | null,
    loading: false as Boolean,
    error: null as string | null,
  }),
  actions: {
    async fetchCoins() {
      this.loading = true;
      this.error = null;
      try {
        const response = await coinGeckoService.fetchCoins('brl');
        this.coins = response;
      } catch (error) {
        this.error = 'Failed to fetch coins';
      } finally {
        this.loading = false;
      }
    },
    addFavorite(coinId: string) {
      if (!this.favorites.includes(coinId)) {
        this.favorites.push(coinId);
      }
    },
    // ...other actions
  },
  getters: {
    favoriteCoins(state) {
      return state.coins.filter(coin => state.favorites.includes(coin.id));
    },
    // ...other getters
  }
});