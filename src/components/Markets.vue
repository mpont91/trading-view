<template>
  <RefreshButton @click="refresh" />
  <MarketsTable :markets="markets" :has-error="hasError" />
  <MarketsPredictions
    :predictions="predictions"
    :pairs="pairs"
    :has-error="hasError"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMarkets, getPredictions } from '../api.ts'
import type { Market, Prediction } from '../types'
import RefreshButton from './RefreshButton.vue'
import MarketsTable from './MarketsTable.vue'
import MarketsPredictions from './MarketsPredictions.vue'

const hasError = ref<null | boolean>(null)
const markets = ref<Market[]>([])
const predictions = ref<Prediction[]>([])
const pairs = ref([])

onMounted(async () => {
  await refresh()
})

async function refresh() {
  markets.value = []
  try {
    const [fetchedMarkets, fetchedPredictions] = await Promise.all([
      getMarkets(),
      getPredictions(),
    ])
    markets.value = fetchedMarkets
    predictions.value = fetchedPredictions
    pairs.value = markets.value.map((m) => m.pair)
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
}
</script>
<style scoped></style>
