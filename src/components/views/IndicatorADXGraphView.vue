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
  orangeLineColor,
  orangePointColor,
  pointHoverRadiusSmall,
  pointRadiusSmall,
  registerChartJs,
  yellowLineColor,
  yellowPointColor,
} from '../../helpers/graph-helper.ts'
import type { IndicatorADX } from '../../types/indicator.ts'

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
  adx: {
    type: Object as PropType<IndicatorADX[]>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const data = computed(() => ({
  labels: dates.value,
  datasets: [
    {
      label: 'ADX',
      backgroundColor: bluePointColor,
      borderColor: blueLineColor,
      data: adxValue.value,
      pointRadius: pointRadiusSmall,
      pointHoverRadius: pointHoverRadiusSmall,
    },
    {
      label: 'PDI',
      backgroundColor: yellowPointColor,
      borderColor: yellowLineColor,
      data: pdi.value,
      pointRadius: pointRadiusSmall,
      pointHoverRadius: pointHoverRadiusSmall,
    },
    {
      label: 'MDI',
      backgroundColor: orangePointColor,
      borderColor: orangeLineColor,
      data: mdi.value,
      pointRadius: pointRadiusSmall,
      pointHoverRadius: pointHoverRadiusSmall,
    },
  ],
}))

const interval = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const dates = computed(() => props.adx.map((a: IndicatorADX) => a.createdAt))

const adxValue = computed(() => props.adx.map((a: IndicatorADX) => a.adx))

const pdi = computed(() => props.adx.map((a: IndicatorADX) => a.pdi))

const mdi = computed(() => props.adx.map((a: IndicatorADX) => a.mdi))

const options = computed<ChartOptions<'line'>>(() =>
  getChartOptions(dates.value, interval.value as TimeInterval),
)
</script>
