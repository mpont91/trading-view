<template>
  <div>
    <Line :data="data" :options="options" />
  </div>
</template>
<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'
import type { PropType } from 'vue'
import type { Signal } from '../../models/signal.ts'
import { computed } from 'vue'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
)

const props = defineProps({
  dates: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  prices: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
  signals: {
    type: Array as PropType<Signal[]>,
    default: () => [],
  },
})

const data = computed(() => ({
  labels: props.dates,
  datasets: [
    {
      label: 'Signals',
      data: props.prices,
      pointBackgroundColor: props.signals,
      showLine: false,
      pointRadius: 4,
    },
    {
      label: 'Price',
      backgroundColor: 'blue',
      borderColor: 'blue',
      data: props.prices,
    },
  ],
}))

const options = {
  responsive: true,
}
</script>
