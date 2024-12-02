<template>
  <Card>
    <h2>Holdings</h2>
    <GraphInterval v-model="interval" />
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
import GraphInterval from './GraphInterval.vue'
import type { TimeInterval } from '../types/time-interval.ts'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
)

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  holdings: {
    type: Array as PropType<Holding[]>,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

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

const interval = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const options: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    x: {
      grid: {
        color: '#525252',
      },
      ticks: {
        callback: (_, index) => formatLabel(dates.value[index], interval.value),
        autoSkip: true,
        maxRotation: 0,
        minRotation: 0,
      },
    },
    y: {
      grid: {
        color: '#525252',
      },
    },
  },
}

const dates = computed(() =>
  props.holdings.map((holding: Holding) => holding.createdAt),
)

const amounts = computed(() =>
  props.holdings.map((holding: Holding) => holding.amount),
)

function formatLabel(dateString: Date, interval: TimeInterval): string {
  const date = new Date(dateString)
  switch (interval) {
    case 'day':
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    default:
      return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
      })
  }
}
</script>
