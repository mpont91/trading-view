<template>
  <RefreshButton :disabled="isLoading" @click="refresh" />
  <ErrorMessage v-if="hasError" message="Couldn't fetch the analysis!" />
  <SelectorRadio
    v-if="selectedPairPrediction"
    class="my-4"
    v-model="selectedPairPrediction"
    :items="pairs"
    name="prediction-pairs"
  />
  <Loading v-if="isLoading" />
  <AnalysisGraph
    v-if="!hasError && !isLoading"
    :title="`Predictions ${selectedPairPrediction}`"
    :dates="datesPrediction"
    :prices="pricesPrediction"
    :signals="signalsPrediction"
  />
  <hr class="my-4" />
  <SelectorRadio
    v-if="selectedIndicatorName"
    class="my-4"
    v-model="selectedIndicatorName"
    :items="indicatorNames"
    name="indicators"
  />
  <SelectorRadio
    v-if="selectedPairIndicator"
    class="my-4"
    v-model="selectedPairIndicator"
    :items="pairs"
    name="indicator-pairs"
  />
  <Loading v-if="isLoading" />
  <AnalysisGraph
    v-if="!hasError && !isLoading"
    :title="`Indicator ${selectedIndicatorName} ${selectedPairIndicator}`"
    :dates="datesIndicator"
    :prices="pricesIndicator"
    :signals="signalsIndicator"
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
import Loading from '../shared/Loading.vue'

const hasError = ref<boolean>(false)
const predictions = ref<Prediction[]>([])
const indicators = ref<Indicator[]>([])
const isLoading = ref<boolean>(true)
const selectedPairPrediction = ref<string | null>(null)
const selectedPairIndicator = ref<string | null>(null)
const pairs = ref<string[]>([])
const selectedIndicatorName = ref<string | null>(null)
const indicatorNames = ref<string[]>(['SMA', 'EMA', 'MACD', 'RSI'])

const signalWeights: SignalWeights = {
  'STRONG BUY': 2,
  BUY: 1,
  HOLD: 0,
  SELL: -1,
  'STRONG SELL': -2,
}

onMounted(async () => {
  selectedIndicatorName.value = indicatorNames.value[0]
  try {
    pairs.value = await getPairs()
    selectedPairPrediction.value = pairs.value[0]
    selectedPairIndicator.value = pairs.value[0]
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
    (prediction: Prediction) =>
      prediction.pair === selectedPairPrediction.value,
  ),
)

const filteredIndicators = computed(() =>
  indicators.value.filter(
    (indicator: Indicator) =>
      indicator.name === selectedIndicatorName.value &&
      indicator.pair === selectedPairIndicator.value,
  ),
)

const pricesPrediction = computed(() =>
  filteredPredictions.value.map(
    (prediction: Prediction) => prediction.current_price,
  ),
)

const pricesIndicator = computed(() =>
  filteredIndicators.value.map(
    (indicator: Indicator) => indicator.current_price,
  ),
)

const datesPrediction = computed(() =>
  filteredPredictions.value.map((prediction: Prediction) =>
    new Date(prediction.created_at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  ),
)

const datesIndicator = computed(() =>
  filteredIndicators.value.map((indicator: Indicator) =>
    new Date(indicator.created_at).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  ),
)

const signalsPrediction = computed(() => {
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

const signalsIndicator = computed(() => {
  return filteredIndicators.value.map(
    (indicator: Indicator) => indicator.signal,
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
</script>
