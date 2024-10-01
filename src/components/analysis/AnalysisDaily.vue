<template>
  <RefreshButton :disabled="isLoading" @click="refresh" />
  <ErrorMessage v-if="hasError" message="Couldn't fetch the predictions!" />
  <AnalysisGraph
    v-if="!hasError && !isLoading"
    :dates="reducedDates"
    :prices="reducedPrices"
    :signals="signals"
  />
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AnalysisGraph from './AnalysisGraph.vue'
import RefreshButton from '../shared/RefreshButton.vue'
import ErrorMessage from '../shared/ErrorMessage.vue'
import { getAnalysis } from '../../api.js'
import type { Prediction } from '../../models/prediction.ts'

const hasError = ref<boolean>(false)
const predictions = ref<Prediction[]>([])
const isLoading = ref<boolean>(true)

onMounted(async () => {
  await refresh()
})

async function refresh() {
  isLoading.value = true
  predictions.value = []

  try {
    predictions.value = await getAnalysis()
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

const filteredPredictions = computed(() =>
  predictions.value.filter((prediction) => prediction.pair === 'BTCUSDC'),
)

const prices = computed(() =>
  filteredPredictions.value.map((prediction) => prediction.current_price),
)

const reducedPrices = computed(() =>
  filteredPredictions.value
    .filter((_, index) => index % 5 === 0)
    .map((prediction) => prediction.current_price),
)

const reducedSignals = computed(() => {
  const groupedSignals = []
  for (let i = 0; i < filteredPredictions.value.length; i += 5) {
    const chunk = filteredPredictions.value.slice(i, i + 5)
    const totalWeight = chunk.reduce(
      (sum, prediction) => sum + getSignalWeight(prediction.signal),
      0,
    )
    const averageWeight = totalWeight / chunk.length
    groupedSignals.push(getFinalSignal(averageWeight))
  }
  return groupedSignals
})

const reducedDates = computed(() =>
  filteredPredictions.value
    .filter((_, index) => index % 5 === 0)
    .map((prediction) =>
      new Date(prediction.created_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    ),
)

const signals = computed(() =>
  reducedSignals.value.map((signal) => {
    switch (signal) {
      case 'STRONG BUY':
        return '#14532d'
      case 'BUY':
        return '#22c55e'
      case 'SELL':
        return '#f87171'
      case 'STRONG SELL':
        return '#7f1d1d'
      case 'HOLD':
        return '#eab308'
      default:
        return 'gray'
    }
  }),
)

const dates = computed(() =>
  filteredPredictions.value.map((prediction) =>
    new Date(prediction.created_at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  ),
)

function getSignalWeight(signal: string): number {
  switch (signal) {
    case 'STRONG BUY':
      return 2
    case 'BUY':
      return 1
    case 'HOLD':
      return 0
    case 'SELL':
      return -1
    case 'STRONG SELL':
      return -2
    default:
      return 0
  }
}

function getFinalSignal(averageWeight: number): string {
  if (averageWeight > 1.5) {
    return 'STRONG BUY'
  } else if (averageWeight > 0.1) {
    return 'BUY'
  } else if (averageWeight < -1.5) {
    return 'STRONG SELL'
  } else if (averageWeight < -0.1) {
    return 'SELL'
  } else {
    return 'HOLD'
  }
}
</script>
