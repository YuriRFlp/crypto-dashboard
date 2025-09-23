<template>
  <DefaultLayout>
    <div v-if="coin" class="mx-auto bg-background-dark rounded-lg shadow-lg py-8 mt-8 text-text-dark">
      <div class="flex items-center gap-4 mb-6">
        <ElButton @click="$router.push('/')" class="mb-6" round plain type="info">
          <ElIcon class="mr-2"><Back /></ElIcon>
          Voltar
        </ElButton>
      </div>

      <div class="flex items-center gap-4 mb-6">
        <img :src="coin.image" :alt="coin.name" class="w-14 h-14 rounded-full border-2 border-background-light" />
        <div>
          <h2 class="text-3xl font-bold">
            {{ coin.name }} 
            <span class="text-lg text-text-light mr-4">({{ coin.symbol ? coin.symbol.toUpperCase() : '-' }})</span>
            <span class="text-sm text-text-light mt-1">Rank #{{ coin.market_cap_rank }}</span>
          </h2>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div class="text-xs text-text-light mb-1">Preço atual</div>
          <div class="text-2xl font-semibold">{{ coin.current_price ? coin.current_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' }}</div>
        </div>
        <div>
          <div class="text-xs text-text-light mb-1">Preço mínimo em 24h</div>
          <div class="text-2xl font-semibold">{{ coin.low_24h ? coin.low_24h.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' }}</div>
        </div>
        <div>
          <div class="text-xs text-text-light mb-1">Preço máximo em 24h</div>
          <div class="text-2xl font-semibold">{{ coin.high_24h ? coin.high_24h.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-' }}</div>
        </div>
        <div>
          <div class="text-xs text-text-light mb-1">Variação preço em 24h</div>
          <div :class="coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-error'" class="text-2xl font-semibold">
            {{ coin.price_change_percentage_24h >= 0 ? '+' : '' }}{{ (coin.price_change_percentage_24h || 0).toFixed(2) }}%
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <div>
          <div class="text-xs text-text-light mb-1">Market Cap</div>
          <div class="text-2xl font-semibold">{{ formatMarketCap(coin.market_cap) }}</div>
        </div>
        <div>
          <div class="text-xs text-text-light mb-1">Variação Market Cap em 24h</div>
          <div :class="coin.market_cap_change_percentage_24h >= 0 ? 'text-success' : 'text-error'" class="text-2xl font-semibold">
            {{ coin.market_cap_change_percentage_24h >= 0 ? '+' : '' }}{{ (coin.market_cap_change_percentage_24h || 0).toFixed(2) }}%
          </div>
        </div>
        <div>
          <div class="text-xs text-text-light mb-1">ROI</div>
          <div class="text-2xl font-semibold">{{ coin.roi ? coin.roi.toLocaleString('pt-br') : '-' }}</div>
        </div>
        <div>
          <div class="text-xs text-text-light mb-1">Volume total</div>
          <div class="text-2xl font-semibold">{{ coin.total_volume ? coin.total_volume.toLocaleString('pt-br') : '-' }}</div>
        </div>
      </div>

      <div v-if="coinStore.historical" class="mx-auto bg-background-dark rounded-lg shadow-lg py-8 mt-8 text-text-dark">
        <CoinChart :data="historical" />
      </div>
    </div>

    <div v-else class="flex items-center justify-center text-center text-text-light mt-16">
      <ElIcon class="mr-2 animate-spin" size="36"><Loading /></ElIcon>
      <span>Loading...</span>
    </div>
  </DefaultLayout>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import type { Coin } from '../interfaces';
import { formatMarketCap } from '../utils/helpers';
import { ElButton, ElIcon } from 'element-plus';
import { Back, Loading } from '@element-plus/icons-vue';
import { useCoinStore } from '../store/coinStore';
import CoinChart from '../components/CoinChart.vue';

const route = useRoute();
const coin = ref<Coin | null>(null);
const historical = ref<{ x: Date, y: number }[]>([]);
const coinStore = useCoinStore();

watch(() => coinStore.historical, (newVal) => {
  if (newVal) {
    historical.value = newVal.map((data: { x: Date, y: number }) => ({
      x: data.x,
      y: data.y
    }));
  }
});

onMounted(async () => {
  if (route.params.id) {
    coin.value = await coinStore.fetchCoinDetails(route.params.id as string);
    await coinStore.fetchHistoricalData(route.params.id as string);
  }
});
</script>
