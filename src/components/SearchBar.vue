<template>
  <div class="flex items-center custom-bg-dark rounded-lg py-2 w-full">
    <ElInput
      v-model="search"
      placeholder="Pesquisar criptomoeda"
      :prefix-icon="Search"
      class="flex-1"
      clearable
      size="large"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
import { ElInput } from 'element-plus';
import { Search } from '@element-plus/icons-vue'

const props = defineProps<{ modelValue?: string; }>();
const emit = defineEmits(['update:modelValue', 'update:sortValue']);

const search = ref(props.modelValue ?? '');

watch(search, val => emit('update:modelValue', val));
</script>
