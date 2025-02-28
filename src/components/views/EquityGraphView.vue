<template>
  <Card>
    <h2>Equity</h2>
    <p class="text-xl font-extrabold text-lime-600">
      {{ formatAmount(currentEquity) }}
    </p>
    <GraphInterval class="my-4 sm:float-right" v-model="interval" />
    <Line :data="data" :options="options" />
  </Card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { Equity } from '../../types/equity.ts'
import type { ChartOptions } from 'chart.js'
import { Line } from 'vue-chartjs'
import Card from '../common/Card.vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import GraphInterval from './GraphIntervalView.vue'
import type { TimeInterval } from '../../types/time-interval.ts'
import { formatAmount } from '../../helpers/format-helper.ts'

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
  equity: {
    type: Array as PropType<Equity[]>,
    required: true,
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
        callback: (_, index) =>
          formatLabel(dates.value[index], interval.value as TimeInterval),
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
  props.equity.map((equity: Equity) => equity.createdAt),
)

const amounts = computed(() =>
  props.equity.map((equity: Equity) => equity.amount),
)

const currentEquity = computed(() => {
  if (props.equity.length === 0) {
    return 0
  }

  return props.equity[props.equity.length - 1].amount
})

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
