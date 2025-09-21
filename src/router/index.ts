
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '../pages/Home.vue';
// import Details from '../pages/Details.vue';
// import Favorites from '../pages/Favorites.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	// {
	// 	path: '/coin/:id',
	// 	name: 'CoinDetails',
	// 	component: Details,
	// 	props: true,
	// },
	// {
	// 	path: '/favorites',
	// 	name: 'Favorites',
	// 	component: Favorites,
	// },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
