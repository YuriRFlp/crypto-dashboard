<template>
  <VueApexCharts
    type="line"
    height="350"
    :options="chartOptions"
    :series="series"
  />
</template>

<script setup lang="ts">
  import { defineProps, computed } from "vue";
  import VueApexCharts from "vue3-apexcharts";

  const props = defineProps({
    data: {
      type: Array as () => { x: Date; y: number }[],
      required: true
    }
  });

  const series = computed(() => {
    return [
      {
        name: "Preço (R$)",
        data: props.data
      }
    ];
  });

  const chartOptions = {
    chart: { id: "coin-chart" },
    xaxis: { type: "datetime" },
    yaxis: {
      labels: {
        formatter: (val: number) =>
          val.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
          })
      }
    },
  };
</script>
