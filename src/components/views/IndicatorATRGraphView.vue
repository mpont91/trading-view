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
import type { IndicatorATR } from '../../types/indicator.ts'

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
  atr: {
    type: Object as PropType<IndicatorATR[]>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const data = computed(() => ({
  labels: dates.value,
  datasets: [
    {
      label: 'ATR',
      backgroundColor: bluePointColor,
      borderColor: blueLineColor,
      data: atrValue.value,
      pointRadius: pointRadiusSmall,
      pointHoverRadius: pointHoverRadiusSmall,
    },
  ],
}))

const interval = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const dates = computed(() => props.atr.map((a: IndicatorATR) => a.createdAt))

const atrValue = computed(() => props.atr.map((a: IndicatorATR) => a.atr))

const options = computed<ChartOptions<'line'>>(() =>
  getChartOptions(dates.value, interval.value as TimeInterval),
)
</script>
