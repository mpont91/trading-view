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
    @update:from="refreshPredictions"
    @update:to="refreshPredictions"
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
    @update:from="refreshIndicators"
    @update:to="refreshIndicators"
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
import SelectorSingle from '../shared/SelectorSingle.vue'
import Loading from '../shared/Loading.vue'
import DateRangeField from '../shared/DateRangeField.vue'
import type { Pair } from '../../models/pair.ts'
import { indicatorNames as indicatorsListNames } from '../../helpers/indicators-helper.ts'
import {
  dateTimeFormatLocale,
  dateTimeFormatOptions,
} from '../../helpers/format-helper.ts'

const hasError = ref<boolean>(false)
const predictions = ref<Prediction[]>([])
const indicators = ref<Indicator[]>([])
const isLoading = ref<boolean>(true)
const selectedPairPrediction = ref<string | null>(null)
const selectedPairIndicator = ref<string | null>(null)
const pairs = ref<string[]>([])
const selectedIndicatorName = ref<string | null>(null)
const indicatorNames = ref<string[]>(indicatorsListNames)
const predictionsDateFrom = ref(
  new Date(new Date().setDate(new Date().getDate() - 1)),
)
const predictionsDateTo = ref(new Date())
const indicatorsDateFrom = ref(
  new Date(new Date().setDate(new Date().getDate() - 1)),
)
const indicatorsDateTo = ref(new Date())

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
    new Date(prediction.created_at).toLocaleString(
      dateTimeFormatLocale,
      dateTimeFormatOptions,
    ),
  ),
)

const datesIndicator = computed(() =>
  indicators.value.map((indicator: Indicator) =>
    new Date(indicator.created_at).toLocaleString(
      dateTimeFormatLocale,
      dateTimeFormatOptions,
    ),
  ),
)

const signalsPrediction = computed(() => {
  return predictions.value.map((prediction: Prediction) => prediction.signal)
})

const signalsIndicator = computed(() => {
  return indicators.value.map((indicator: Indicator) => indicator.signal)
})
</script>
