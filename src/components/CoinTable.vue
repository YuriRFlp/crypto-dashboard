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
  <ElTableColumn label="" width="120" align="center">
    <template #default="{ row }">
      <ElButton
        aria-label="Details"
        circle
        plain
        type="info"
        size="small"
        @click="$emit('view-details', row)"
      >
        <ElIcon><View /></ElIcon>
      </ElButton>
      <ElButton
        aria-label="Favorite"
        circle
        :plain="!isFavorite(row.id)"
        type="warning"
        size="small"
        class="favoriteBtn"
        @click="$emit('toggle-favorite', row)"
      >
        <span class="text-secondary text-xl"><ElIcon><Star /></ElIcon></span>
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
import { View, Star } from '@element-plus/icons-vue';
import { formatMarketCap } from '../utils/helpers';

defineProps<{ 
  coins: Coin[], 
  columns: Column[], 
  pageSize: number, 
  currentPage: number, 
  total: number,
  isFavorite: (id: string) => boolean
}>();
const emit = defineEmits(['update:currentPage', 'view-details', 'toggle-favorite']);

const onPageChange = (page: number) => {
  emit('update:currentPage', page);
};
</script>