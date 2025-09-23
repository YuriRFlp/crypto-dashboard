<template>
  <header class="flex items-center justify-between pn-6 bg-background-dark text-text-dark">
    <RouterLink to="/">
      <h1 class="text-3xl font-semi text-center">Cripto</h1>
    </RouterLink>
    <nav class="w-[60%]">
      <ul class="flex items-center gap-6">
        <li>
          <RouterLink to="/favorites" activeClass="activeLink">Favoritos</RouterLink>
        </li>
      </ul>
    </nav>
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

<style scoped>
a {
  color: #ffffffde;
}
nav li a {
  display: inline-block;
  color: #ffffffde;
  margin-top: 10px;
}

.activeLink {
  text-decoration: underline;
}
</style>
