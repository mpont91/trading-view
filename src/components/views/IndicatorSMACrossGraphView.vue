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
  whiteLineColor,
  whitePointColor,
  yellowLineColor,
  yellowPointColor,
} from '../../helpers/graph-helper.ts'
import type { IndicatorSMACross } from '../../types/indicator.ts'

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
  smaCross: {
    type: Object as PropType<IndicatorSMACross[]>,
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
      label: 'SMA long',
      backgroundColor: yellowPointColor,
      borderColor: yellowLineColor,
      data: smaLong.value,
      pointRadius: pointRadiusSmall,
      pointHoverRadius: pointHoverRadiusSmall,
    },
    {
      label: 'SMA short',
      backgroundColor: bluePointColor,
      borderColor: blueLineColor,
      data: smaShort.value,
      pointRadius: pointRadiusSmall,
      pointHoverRadius: pointHoverRadiusSmall,
    },
  ],
}))

const interval = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const dates = computed(() =>
  props.smaCross.map((s: IndicatorSMACross) => s.createdAt),
)

const price = computed(() =>
  props.smaCross.map((s: IndicatorSMACross) => s.price),
)

const smaLong = computed(() =>
  props.smaCross.map((s: IndicatorSMACross) => s.smaLong),
)

const smaShort = computed(() =>
  props.smaCross.map((s: IndicatorSMACross) => s.smaShort),
)

const options = computed<ChartOptions<'line'>>(() =>
  getChartOptions(dates.value, interval.value as TimeInterval),
)
</script>
