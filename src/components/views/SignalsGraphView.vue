<template>
  <Card title="Signals">
    <GraphInterval class="my-4 sm:float-right" v-model="interval" />
    <Line :data="data" :options="options" />
  </Card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Card from '../common/Card.vue'
import GraphInterval from './GraphIntervalView.vue'
import { formatLabel, registerChartJs } from '../../helpers/graph-helper.ts'
import type { PropType } from 'vue'
import type { Signals } from '../../types/signals.ts'
import type { ChartOptions } from 'chart.js'
import type { TimeInterval } from '../../types/time-interval.ts'
import { Line } from 'vue-chartjs'

registerChartJs()

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  signals: {
    type: Object as PropType<Signals>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const data = computed(() => ({
  labels: priceDates.value,
  datasets: [
    {
      label: 'Long Opportunities',
      data: longOpportunities.value,
      backgroundColor: '#22c55e',
      borderColor: 'transparent',
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: 'Short Opportunities',
      data: shortOpportunities.value,
      backgroundColor: '#ef4444',
      borderColor: 'transparent',
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: 'Price ($)',
      backgroundColor: '#EEE',
      borderColor: '#FFF',
      data: priceAmounts.value,
    },
  ],
}))

const options: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    x: {
      grid: {
        color: '#525252',
      },
      ticks: {
        callback: (_, index) =>
          formatLabel(priceDates.value[index], interval.value as TimeInterval),
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

const priceDates = computed(() => props.signals?.prices.map((p) => p.date))
const priceAmounts = computed(() => props.signals?.prices.map((p) => p.amount))
const longOpportunities = computed(() => {
  const alignedData = new Array(props.signals?.prices.length).fill(null)

  props.signals?.opportunities.forEach((o) => {
    if (o.side === 'long') {
      const closestIndex = findClosestPriceIndex(o.date)
      alignedData[closestIndex] = priceAmounts.value[closestIndex]
    }
  })

  return alignedData
})

const shortOpportunities = computed(() => {
  const alignedData = new Array(props.signals?.prices.length).fill(null)

  props.signals?.opportunities.forEach((o) => {
    if (o.side === 'short') {
      const closestIndex = findClosestPriceIndex(o.date)
      alignedData[closestIndex] = priceAmounts.value[closestIndex]
    }
  })

  return alignedData
})
const findClosestPriceIndex = (opportunityDate: Date): number => {
  let closestIndex = 0
  let minDifference = Math.abs(
    new Date(priceDates.value[0]).getTime() -
      new Date(opportunityDate).getTime(),
  )

  for (let i = 1; i < priceDates.value.length; i++) {
    const diff = Math.abs(
      new Date(priceDates.value[i]).getTime() -
        new Date(opportunityDate).getTime(),
    )
    if (diff < minDifference) {
      minDifference = diff
      closestIndex = i
    }
  }

  return closestIndex
}

const interval = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
