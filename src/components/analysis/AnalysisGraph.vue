<template>
  <header>
    <h2>{{ title }}</h2>
    <AnalysisSignalsCounter
      :signal-counts="signalCounts"
      :signal-color="signalColor"
    />
  </header>
  <div>
    <Line :data="data" :options="options" />
  </div>
</template>
<script setup lang="ts">
import { signalColor } from '../../helpers/signal-helper.ts'
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
import AnalysisSignalsCounter from './AnalysisSignalsCounter.vue'

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
</script>
