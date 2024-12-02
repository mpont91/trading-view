<template>
  <Card>
    <h2>Holdings</h2>
    <Line :data="data" :options="options" />
  </Card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { Holding } from '../models/holding'
import type { ChartOptions } from 'chart.js'
import { Line } from 'vue-chartjs'
import Card from './Card.vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
)

const props = defineProps({
  holdings: {
    type: Array as PropType<Holding[]>,
    default: () => [],
  },
})

const data = computed(() => ({
  labels: dates.value,
  datasets: [
    {
      label: 'Amount ($)',
      backgroundColor: '#22c55e',
      borderColor: '#166534',
      data: amounts.value,
    },
  ],
}))

const options: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        maxRotation: 0,
        minRotation: 0,
      },
    },
  },
}

const dates = computed(() =>
  props.holdings.map((holding: Holding) =>
    new Date(holding.createdAt).toLocaleDateString(),
  ),
)

const amounts = computed(() =>
  props.holdings.map((holding: Holding) => holding.amount),
)
</script>
