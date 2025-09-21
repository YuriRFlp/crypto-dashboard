
<template>
	<DefaultLayout>
		<div class="flex flex-col gap-6">
			<SearchBar v-model="search" />
			<CoinTable
				:coins="paginatedCoins"
				:columns="columns"
				:page-size="pagination.pageSize"
				:current-page="pagination.currentPage"
				:total="pagination.total"
				@update:currentPage="pagination.currentPage = $event"
			/>
		</div>
	</DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import SearchBar from '../components/SearchBar.vue';
import CoinTable from '../components/CoinTable.vue';
import { useCoinStore } from '../store/coinStore';
import type { Column } from '../interfaces';

const coinStore = useCoinStore();
const search = ref<string>('');
const columns = ref<Column[]>([
  { key: 'rank', prop: 'market_cap_rank', label: 'Rank', width: '80', align: 'left' },
  { key: 'name', label: 'Name', minWidth: '160', slot: 'name' },
  { key: 'price', label: 'Price', minWidth: '120', slot: 'price' },
  { key: 'change', label: '24h', minWidth: '100', slot: 'change' },
  { key: 'marketCap', label: 'Market Cap', minWidth: '140', slot: 'marketCap' },
]);

const pagination = ref({
	pageSize: 10,
	currentPage: 1,
	get total() {
		return filteredCoins.value.length;
	}
});

const paginatedCoins = computed(() => {
  const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
  return filteredCoins.value.slice(start, start + pagination.value.pageSize);
});

const filteredCoins = computed(() => {
	let filtered = coinStore.coins;
	if (search.value) {
		filtered = filtered.filter(coin =>
			coin.name.toLowerCase().includes(search.value.toLowerCase()) ||
			coin.symbol.toLowerCase().includes(search.value.toLowerCase())
		);
	}
	return filtered;
});

onMounted(async () => {
  await coinStore.fetchCoins();
});
</script>
