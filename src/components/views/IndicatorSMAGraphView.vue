<template>
  <Card :title="title">
    <GraphInterval class="my-4 sm:float-right" v-model="interval" />
    <Line :data="data" :options="options" />
  </Card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { ChartOptions } from 'chart.js'
import { Line } from 'vue-chartjs'
import Card from '../common/Card.vue'
import GraphInterval from './GraphIntervalView.vue'
import type { TimeInterval } from '../../types/time-interval.ts'
import {
  blueLineColor,
  bluePointColor,
  getChartOptions,
  greenLineColor,
  greenPointColor,
  registerChartJs,
  whiteLineColor,
  whitePointColor,
} from '../../helpers/graph-helper.ts'
import type { IndicatorSMA } from '../../types/indicator.ts'

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
  sma: {
    type: Object as PropType<IndicatorSMA[]>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const data = computed(() => ({
  labels: dates.value,
  datasets: [
    {
      label: 'Price',
      backgroundColor: whitePointColor,
      borderColor: whiteLineColor,
      data: price.value,
      pointRadius: 0,
      pointHoverRadius: 0,
    },
    {
      label: 'SMA',
      backgroundColor: bluePointColor,
      borderColor: blueLineColor,
      data: smaValue.value,
      pointRadius: 0,
      pointHoverRadius: 0,
    },
  ],
}))

const interval = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const dates = computed(() => props.sma.map((s: IndicatorSMA) => s.createdAt))

const price = computed(() => props.sma.map((s: IndicatorSMA) => s.price))

const smaValue = computed(() => props.sma.map((s: IndicatorSMA) => s.sma))

const options = computed<ChartOptions<'line'>>(() =>
  getChartOptions(dates.value, interval.value as TimeInterval),
)
</script>
