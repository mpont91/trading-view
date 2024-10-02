<template>
  <header>
    <h2>{{ title }}</h2>
    <ul>
      <li
        class="inline me-4"
        v-for="(count, signal) in signalCounts"
        :key="signal"
      >
        {{ signal }}: {{ count }}
      </li>
    </ul>
  </header>
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
import { computed } from 'vue'
import type { Signal } from '../../models/signal.ts'

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
  title: {
    type: String,
    default: null,
  },
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
      data: props.prices,
      pointBackgroundColor: signalColors.value,
      showLine: false,
      pointRadius: 3,
    },
    {
      backgroundColor: 'white',
      borderColor: 'white',
      data: props.prices,
    },
  ],
}))

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
}

const signalColors = computed(() => {
  return props.signals.map((signal) => signalColor(signal))
})

const signalCounts = computed(() => {
  return props.signals.reduce(
    (acc, signal) => {
      if (!acc[signal]) {
        acc[signal] = 0
      }
      acc[signal] += 1
      return acc
    },
    {} as Record<string, number>,
  )
})

function signalColor(signal: Signal): string {
  switch (signal) {
    case 'STRONG BUY':
      return '#14532d'
    case 'BUY':
      return '#22c55e'
    case 'SELL':
      return '#f87171'
    case 'STRONG SELL':
      return '#7f1d1d'
    case 'HOLD':
      return '#eab308'
    default:
      return 'transparent'
  }
}
</script>
