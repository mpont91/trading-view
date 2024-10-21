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
import { ref, computed, onMounted } from 'vue'
import DateRangeField from '../shared/DateRangeField.vue'
import { getHoldingsGraph } from '../../api.ts'
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const isLoading = ref<boolean>(true)
const hasError = ref<boolean>(false)
const dateFrom = ref(new Date(new Date().setMonth(new Date().getMonth() - 1)))
const dateTo = ref(new Date())
const holdings = ref<Holding[]>([])

onMounted(async () => {
  await refresh()
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
  holdings.value.map((holding: Holding) =>
    new Date(holding.created_at).toLocaleDateString(),
  ),
)

const amounts = computed(() =>
  holdings.value.map((holding: Holding) => holding.amount),
)

async function refresh() {
  isLoading.value = true
  try {
    holdings.value = await getHoldingsGraph(dateFrom.value, dateTo.value)
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

async function updateFrom(newFrom: Date) {
  dateFrom.value = newFrom
  await refresh()
}

async function updateTo(newTo: Date) {
  dateTo.value = newTo
  await refresh()
}
</script>
