
<template>
	<DefaultLayout>
    <h2 class="text-normal text-left font-semi mt-4">Listagem das moedas favoritadas</h2>
		<div v-if="paginatedCoins" class="flex flex-col gap-6">
			<SearchBar v-model="search" class="mt-4" />
			<CoinTable
				:coins="paginatedCoins"
				:columns="columns"
				:page-size="pagination.pageSize"
				:current-page="pagination.currentPage"
				:total="pagination.total"
        :isFavorite="coinStore.isFavorite"
				@update:currentPage="pagination.currentPage = $event"
				@view-details="handleViewDetails"
        @toggle-favorite="handleToggleFavorite"
			/>
		</div>
		<div v-else class="flex items-center justify-center text-center text-text-light mt-16">
			<ElIcon class="mr-2 animate-spin" size="36"><Loading /></ElIcon>
    	<span>Loading...</span>
		</div>
	</DefaultLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import SearchBar from '../components/SearchBar.vue';
import CoinTable from '../components/CoinTable.vue';
import { useCoinStore } from '../store/coinStore';
import type { Coin, Column } from '../interfaces';
import router from '../router';
import { ElIcon } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus'

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
const filterTrigger = ref(0);

const filteredCoins = computed(() => {
	filterTrigger.value;
	let filtered = coinStore.getFavoriteCoins();

	if (search.value) {
		filtered = filtered.filter(coin =>
			coin.name.toLowerCase().includes(search.value.toLowerCase()) ||
			coin.symbol.toLowerCase().includes(search.value.toLowerCase())
		);
	}
	return filtered;
});

const paginatedCoins = computed(() => {
	const start = (pagination.value.currentPage - 1) * pagination.value.pageSize;
	return filteredCoins.value.slice(start, start + pagination.value.pageSize);
});

const handleToggleFavorite = (coin: Coin) => {
	coinStore.toggleFavorite(coin.id);
	filterTrigger.value++;
	const isFav = coinStore.isFavorite(coin.id);
	ElNotification({
		title: isFav ? 'Adicionado aos Favoritos' : 'Removido dos Favoritos',
		message: isFav ? `${coin.name} foi adicionado aos seus favoritos.` : `${coin.name} foi removido dos seus favoritos.`,
		type: 'success',
	});
};

const handleViewDetails = async (coin: any) => {
	try {
		await coinStore.fetchCoinDetails(coin.id);

		if (coinStore.selectedCoin && coinStore.selectedCoin.code === "ERR_NETWORK") {
			ElNotification({
				title: 'Erro',
				message: 'Erro ao buscar os detalhes da moeda.',
				type: 'error',
			});
			return;
		}

		router.push({ name: 'CoinDetails', params: { id: coin.id } });
	} catch (error) {
		ElNotification({
			title: 'Error',
			message: 'Erro ao buscar os detalhes da moeda.',
			type: 'error',
		});
	}
};

onMounted(async () => {
	if (!coinStore.coins.length) await coinStore.fetchCoins();
});
</script>
