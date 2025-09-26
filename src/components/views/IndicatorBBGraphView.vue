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
  yellowPointColor,
  yellowLineColor,
  whitePointColor,
  whiteLineColor,
} from '../../helpers/graph-helper.ts'
import type { IndicatorBB } from '../../types/indicator.ts'

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
  bb: {
    type: Object as PropType<IndicatorBB[]>,
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
      label: 'Upper',
      backgroundColor: bluePointColor,
      borderColor: blueLineColor,
      data: upper.value,
      pointRadius: pointRadiusSmall,
      pointHoverRadius: pointHoverRadiusSmall,
    },
    {
      label: 'Middle',
      backgroundColor: yellowPointColor,
      borderColor: yellowLineColor,
      data: middle.value,
      pointRadius: pointRadiusSmall,
      pointHoverRadius: pointHoverRadiusSmall,
    },
    {
      label: 'Lower',
      backgroundColor: orangePointColor,
      borderColor: orangeLineColor,
      data: lower.value,
      pointRadius: pointRadiusSmall,
      pointHoverRadius: pointHoverRadiusSmall,
    },
  ],
}))

const interval = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const dates = computed(() => props.bb.map((b: IndicatorBB) => b.createdAt))

const price = computed(() => props.bb.map((b: IndicatorBB) => b.price))

const upper = computed(() => props.bb.map((b: IndicatorBB) => b.upper))

const middle = computed(() => props.bb.map((b: IndicatorBB) => b.middle))

const lower = computed(() => props.bb.map((b: IndicatorBB) => b.lower))

const options = computed<ChartOptions<'line'>>(() =>
  getChartOptions(dates.value, interval.value as TimeInterval),
)
</script>
