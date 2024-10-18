<template>
  <div class="bg-neutral-800 shadow p-6 mb-6">
    <h2>Holdings</h2>
    <DateRangeField
      :from="dateFrom"
      :to="dateTo"
      @update:from="updateFrom"
      @update:to="updateTo"
    />
    <Line :data="data" :options="options" />
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Holding } from '../../models/holding'

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

const dateFrom = ref(new Date())
const dateTo = ref(new Date())

import { ref, computed } from 'vue'
import DateRangeField from '../shared/DateRangeField.vue'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const props = defineProps({
  holdings: {
    type: Array as PropType<Holding[]>,
  },
})

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

const options = {
  responsive: true,
}

const dates = computed(() =>
  props.holdings.map((holding: Holding) =>
    new Date(holding.created_at).toLocaleDateString(),
  ),
)

const amounts = computed(() =>
  props.holdings.map((holding: Holding) => holding.amount),
)

const updateFrom = (newFrom: Date) => {
  dateFrom.value = newFrom
}

const updateTo = (newTo: Date) => {
  dateTo.value = newTo
}
</script>
