<template>
  <header class="flex items-center justify-between py-6 bg-background-dark text-text-dark">
    <h1 class="text-3xl font-semi">Cripto Dashboard</h1>
    <div class="flex items-center gap-4">
      <ElButton aria-label="Toggle theme" circle plain>
        <span class="text-lg">☀️</span>
      </ElButton>
      <ElSwitch v-model="isDark" size="large" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElButton, ElSwitch } from 'element-plus';
const isDark = ref(true);
</script>
