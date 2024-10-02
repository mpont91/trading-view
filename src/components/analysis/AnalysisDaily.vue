<template>
  <RefreshButton :disabled="isLoading" @click="refresh" />
  <ErrorMessage v-if="hasError" message="Couldn't fetch the predictions!" />
  <SelectorRadio
    class="my-4"
    v-model="selectedPair"
    :items="pairs"
    @change="onChangePair"
  />
  <AnalysisGraph
    v-if="!hasError && !isLoading"
    :title="`Predictions ${selectedPair}`"
    :dates="dates"
    :prices="prices"
    :signals="signals"
  />
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AnalysisGraph from './AnalysisGraph.vue'
import RefreshButton from '../shared/RefreshButton.vue'
import ErrorMessage from '../shared/ErrorMessage.vue'
import { getAnalysis, getPairs } from '../../api.js'
import type { Prediction } from '../../models/prediction.ts'
import type { Analysis } from '../../models/analysis.ts'
import type { Indicator } from '../../models/indicator.ts'
import type { Signal, SignalWeights } from '../../models/signal.ts'
import SelectorRadio from '../shared/SelectorRadio.vue'

const hasError = ref<boolean>(false)
const predictions = ref<Prediction[]>([])
const indicators = ref<Indicator[]>([])
const isLoading = ref<boolean>(true)
const selectedPair = ref<string | null>(null)
const pairs = ref<string[]>([])

const signalWeights: SignalWeights = {
  'STRONG BUY': 2,
  BUY: 1,
  HOLD: 0,
  SELL: -1,
  'STRONG SELL': -2,
}
const indicatorsWeights: Record<string, number> = {
  EMA: 0.35,
  RSI: 0.35,
  MACD: 0.25,
  SMA: 0.15,
}

onMounted(async () => {
  try {
    pairs.value = await getPairs()
    selectedPair.value = pairs.value[0]
  } catch (error: unknown) {
    hasError.value = true
  }

  await refresh()
})

async function refresh() {
  isLoading.value = true
  predictions.value = []

  try {
    const fetchedAnalysis: Analysis = await getAnalysis()
    predictions.value = fetchedAnalysis.predictions
    indicators.value = fetchedAnalysis.indicators
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

const filteredPredictions = computed(() =>
  predictions.value.filter(
    (prediction) => prediction.pair === selectedPair.value,
  ),
)

const prices = computed(() =>
  filteredPredictions.value.map((prediction) => prediction.current_price),
)

const dates = computed(() =>
  filteredPredictions.value.map((prediction) =>
    new Date(prediction.created_at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  ),
)

const signals = computed(() => {
  const weights: number[] = [2, 1.5, 1.2, 1, 0.8]

  return filteredPredictions.value.map(
    (prediction, index, predictionsArray) => {
      const start = Math.max(index - 4, 0)
      const previousPredictions = predictionsArray.slice(start, index + 1)

      const previousSignals = previousPredictions.map((pred) => pred.signal)

      return calculateWeightedSignal(
        previousSignals,
        weights.slice(0, previousSignals.length),
      )
    },
  )
})

function calculateWeightedSignal(signals: Signal[], weights: number[]): Signal {
  let weightedSum: number = 0
  let weightTotal: number = 0

  for (let i: number = 0; i < signals.length && i < weights.length; i++) {
    const signalValue: number = signalWeights[signals[i]] || 0
    const weight: number = weights[i]

    weightedSum += signalValue * weight
    weightTotal += weight
  }

  const weightedAverage: number = weightedSum / weightTotal

  return weightToSignal(weightedAverage)
}

function weightToSignal(averageWeight: number): Signal {
  if (averageWeight >= 1.5) {
    return 'STRONG BUY'
  } else if (averageWeight >= 0.5) {
    return 'BUY'
  } else if (averageWeight <= -1.5) {
    return 'STRONG SELL'
  } else if (averageWeight <= -0.5) {
    return 'SELL'
  } else {
    return 'HOLD'
  }
}

async function onChangePair() {
  //something
}
</script>
