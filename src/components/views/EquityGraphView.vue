<template>
  <Card title="Equity">
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
import GraphInterval from './GraphIntervalView.vue'
import type { TimeInterval } from '../../types/time-interval.ts'
import { formatAmount } from '../../helpers/format-helper.ts'
import {
  getChartOptions,
  greenLineColor,
  greenPointColor,
  registerChartJs,
} from '../../helpers/graph-helper.ts'

registerChartJs()

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
      backgroundColor: greenPointColor,
      borderColor: greenLineColor,
      data: amounts.value,
    },
  ],
}))

const interval = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

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

const options = computed<ChartOptions<'line'>>(() =>
  getChartOptions(dates.value, interval.value as TimeInterval),
)
</script>
