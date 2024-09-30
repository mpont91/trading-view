<template>
  <RefreshButton :disabled="isLoading" @click="refresh" />
  <ErrorMessage v-if="hasError" message="Couldn't fetch the predictions!" />
  <AnalysisGraph :dates="dates" :prices="prices" :signals="signals" />
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

const signals = computed(() =>
  filteredPredictions.value.map((prediction) => {
    switch (prediction.signal) {
      case 'STRONG BUY':
      case 'BUY':
        return 'green'
      case 'SELL':
      case 'STRONG SELL':
        return 'red'
      case 'HOLD':
        return 'yellow'
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
</script>
