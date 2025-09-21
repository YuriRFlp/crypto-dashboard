<template>
	<div
    class="max-w-6xl mx-auto min-h-screen bg-background-dark text-text-dark"
  >
		<HeaderBar />
		<main>
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
import HeaderBar from '../components/HeaderBar.vue';
</script>
