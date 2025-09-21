<template>
  <ElTable :data="coins" stripe border class="w-full custom-bg-dark text-dark rounded-lg overflow-auto">
  <ElTableColumn
    v-for="col in columns"
    :key="col.key"
    :prop="col.prop"
    :label="col.label"
    :width="col.width"
    :min-width="col.minWidth"
    :align="col.align"
  >
    <template v-if="col.slot === 'name'" #default="{ row }">
      <div class="flex items-center gap-2">
        <img :src="row.image" :alt="row.symbol" class="w-6 h-6 rounded-full" />
        <span class="font-medium">{{ row.symbol.toUpperCase() }}</span>
      </div>
    </template>
    <template v-else-if="col.slot === 'price'" #default="{ row }">
      {{ row.current_price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }) }}
    </template>
    <template v-else-if="col.slot === 'change'" #default="{ row }">
      <span :class="row.price_change_percentage_24h >= 0 ? 'text-success' : 'text-error'">
        {{ row.price_change_percentage_24h >= 0 ? '+' : '' }}{{ row.price_change_percentage_24h.toFixed(1) }}%
      </span>
    </template>
    <template v-else-if="col.slot === 'marketCap'" #default="{ row }">
      {{ formatMarketCap(row.market_cap) }}
    </template>
  </ElTableColumn>
  <ElTableColumn label="" width="60" align="center">
    <template #default>
      <ElButton aria-label="Favorite" circle plain type="warning" size="small">
        <span class="text-secondary text-xl">★</span>
      </ElButton>
    </template>
  </ElTableColumn>
  </ElTable>
  <div class="flex justify-end mt-4">
    <ElPagination
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @current-change="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { Coin, Column } from '../interfaces';
import { defineProps, defineEmits } from 'vue';
import { ElTable, ElTableColumn, ElButton, ElPagination } from 'element-plus';

defineProps<{ coins: Coin[], columns: Column[], pageSize: number, currentPage: number, total: number }>();
const emit = defineEmits(['update:currentPage']);

const onPageChange = (page: number) => {
  emit('update:currentPage', page);
};

const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e12) return (marketCap / 1e12).toFixed(2) + 'T';
  if (marketCap >= 1e9) return (marketCap / 1e9).toFixed(3) + 'B';
  if (marketCap >= 1e6) return (marketCap / 1e6).toFixed(2) + 'M';
  return marketCap.toLocaleString();
}
</script>