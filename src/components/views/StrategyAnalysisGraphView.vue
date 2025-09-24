<template>
  <Card :title="title">
    <GraphInterval class="my-4 sm:float-right" v-model="interval" />
    <Line :data="data" :options="options" />
  </Card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Card from '../common/Card.vue'
import GraphInterval from './GraphIntervalView.vue'
import {
  getChartOptions,
  greenPointColor,
  redPointColor,
  registerChartJs,
  whiteLineColor,
  whitePointColor,
} from '../../helpers/graph-helper.ts'
import type { PropType } from 'vue'
import type { StrategyAnalysis } from '../../types/strategy-analysis.ts'
import { Signal } from '../../types/signal.ts'
import type { ChartOptions } from 'chart.js'
import type { TimeInterval } from '../../types/time-interval.ts'
import { Line } from 'vue-chartjs'

registerChartJs()

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  strategyAnalysis: {
    type: Object as PropType<StrategyAnalysis>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const data = computed(() => ({
  labels: priceDates.value,
  datasets: [
    {
      label: 'Buy',
      data: buyOpportunities.value,
      backgroundColor: greenPointColor,
      borderColor: 'transparent',
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: 'Sell',
      data: sellOpportunities.value,
      backgroundColor: redPointColor,
      borderColor: 'transparent',
      pointRadius: 5,
      pointHoverRadius: 7,
    },
    {
      label: 'Price ($)',
      backgroundColor: whitePointColor,
      borderColor: whiteLineColor,
      data: priceAmounts.value,
      pointRadius: 0,
      pointHoverRadius: 0,
    },
  ],
}))

const priceDates = computed(() =>
  props.strategyAnalysis?.prices.map((p) => p.date),
)
const priceAmounts = computed(() =>
  props.strategyAnalysis?.prices.map((p) => p.amount),
)
const buyOpportunities = computed(() => {
  const alignedData = new Array(props.strategyAnalysis?.prices.length).fill(
    null,
  )

  props.strategyAnalysis?.opportunities
    .filter((o) => o.signal === Signal.BUY)
    .forEach((o) => {
      const closestIndex = findClosestPriceIndex(o.date)
      alignedData[closestIndex] = priceAmounts.value[closestIndex]
    })

  return alignedData
})

const sellOpportunities = computed(() => {
  const alignedData = new Array(props.strategyAnalysis?.prices.length).fill(
    null,
  )

  props.strategyAnalysis?.opportunities
    .filter((o) => o.signal === Signal.SELL)
    .forEach((o) => {
      const closestIndex = findClosestPriceIndex(o.date)
      alignedData[closestIndex] = priceAmounts.value[closestIndex]
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

const options = computed<ChartOptions<'line'>>(() =>
  getChartOptions(priceDates.value, interval.value as TimeInterval),
)
</script>
