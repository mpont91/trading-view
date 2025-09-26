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
  pointHoverRadiusSmall,
  pointRadiusSmall,
  registerChartJs,
} from '../../helpers/graph-helper.ts'
import type { IndicatorRSI } from '../../types/indicator.ts'

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
  rsi: {
    type: Object as PropType<IndicatorRSI[]>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const data = computed(() => ({
  labels: dates.value,
  datasets: [
    {
      label: 'RSI',
      backgroundColor: bluePointColor,
      borderColor: blueLineColor,
      data: rsiValue.value,
      pointRadius: pointRadiusSmall,
      pointHoverRadius: pointHoverRadiusSmall,
    },
  ],
}))

const interval = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const dates = computed(() => props.rsi.map((r: IndicatorRSI) => r.createdAt))

const rsiValue = computed(() => props.rsi.map((r: IndicatorRSI) => r.rsi))

const options = computed<ChartOptions<'line'>>(() =>
  getChartOptions(dates.value, interval.value as TimeInterval),
)
</script>
