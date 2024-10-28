<template>
  <ErrorMessage v-if="hasError" message="Couldn't fetch the analysis!" />
  <SelectorSingle
    v-if="selectedPairPrediction"
    class="my-4"
    v-model="selectedPairPrediction"
    :items="pairs"
    name="prediction-pairs"
    @change="refreshPredictions"
  />
  <DateRangeField
    class="my-4"
    :from="predictionsDateFrom"
    :to="predictionsDateTo"
    @change="refreshPredictions"
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
  <SelectorSingle
    v-if="selectedIndicatorName"
    class="my-4"
    v-model="selectedIndicatorName"
    :items="indicatorNames"
    name="indicators"
    @change="refreshIndicators"
  />
  <SelectorSingle
    v-if="selectedPairIndicator"
    class="my-4"
    v-model="selectedPairIndicator"
    :items="pairs"
    name="indicator-pairs"
    @change="refreshIndicators"
  />
  <DateRangeField
    class="my-4"
    :from="indicatorsDateFrom"
    :to="indicatorsDateTo"
    @change="refreshIndicators"
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
import ErrorMessage from '../shared/ErrorMessage.vue'
import { getIndicatorsGraph, getPairs, getPredictionsGraph } from '../../api.js'
import type { Prediction } from '../../models/prediction.ts'
import type { Indicator } from '../../models/indicator.ts'
import type { Signal, SignalWeights } from '../../models/signal.ts'
import SelectorSingle from '../shared/SelectorSingle.vue'
import Loading from '../shared/Loading.vue'
import DateRangeField from '../shared/DateRangeField.vue'
import type { Pair } from '../../models/pair.ts'

const hasError = ref<boolean>(false)
const predictions = ref<Prediction[]>([])
const indicators = ref<Indicator[]>([])
const isLoading = ref<boolean>(true)
const selectedPairPrediction = ref<string | null>(null)
const selectedPairIndicator = ref<string | null>(null)
const pairs = ref<string[]>([])
const selectedIndicatorName = ref<string | null>(null)
const indicatorNames = ref<string[]>(['SMA', 'EMA', 'MACD', 'RSI'])
const predictionsDateFrom = ref(
  new Date(new Date().setMonth(new Date().getMonth() - 1)),
)
const predictionsDateTo = ref(new Date())
const indicatorsDateFrom = ref(
  new Date(new Date().setMonth(new Date().getMonth() - 1)),
)
const indicatorsDateTo = ref(new Date())

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
    pairs.value = (await getPairs()).map((p: Pair) => p.name)
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
  indicators.value = []

  try {
    predictions.value = await getPredictionsGraph(
      selectedPairPrediction.value as string,
      predictionsDateFrom.value,
      predictionsDateTo.value,
    )
    indicators.value = await getIndicatorsGraph(
      selectedPairIndicator.value as string,
      selectedIndicatorName.value as string,
      indicatorsDateFrom.value,
      indicatorsDateTo.value,
    )
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

async function refreshPredictions() {
  isLoading.value = true
  predictions.value = []

  try {
    predictions.value = await getPredictionsGraph(
      selectedPairPrediction.value as string,
      predictionsDateFrom.value,
      predictionsDateTo.value,
    )
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

async function refreshIndicators() {
  isLoading.value = true
  indicators.value = []

  try {
    indicators.value = await getIndicatorsGraph(
      selectedPairIndicator.value as string,
      selectedIndicatorName.value as string,
      indicatorsDateFrom.value,
      indicatorsDateTo.value,
    )
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

const pricesPrediction = computed(() =>
  predictions.value.map((prediction: Prediction) => prediction.current_price),
)

const pricesIndicator = computed(() =>
  indicators.value.map((indicator: Indicator) => indicator.current_price),
)

const datesPrediction = computed(() =>
  predictions.value.map((prediction: Prediction) =>
    new Date(prediction.created_at).toLocaleDateString(),
  ),
)

const datesIndicator = computed(() =>
  indicators.value.map((indicator: Indicator) =>
    new Date(indicator.created_at).toLocaleDateString(),
  ),
)

const signalsPrediction = computed(() => {
  const weights: number[] = [2, 1.5, 1.2, 1, 0.8]

  return predictions.value.map((prediction, index, predictionsArray) => {
    const start = Math.max(index - 4, 0)
    const previousPredictions = predictionsArray.slice(start, index + 1)

    const previousSignals = previousPredictions.map((pred) => pred.signal)

    return calculateWeightedSignal(
      previousSignals,
      weights.slice(0, previousSignals.length),
    )
  })
})

const signalsIndicator = computed(() => {
  return indicators.value.map((indicator: Indicator) => indicator.signal)
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
