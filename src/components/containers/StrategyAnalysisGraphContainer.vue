<template>
  <GraphSkeleton title="Strategy analysis" v-if="isLoadingStrategyAnalysis" />
  <CardError title="Strategy analysis" v-else-if="hasErrorStrategyAnalysis" />
  <StrategyAnalysisGraphView
    v-else
    title="Strategy analysis"
    v-model="interval"
    :strategy-analysis="strategyAnalysis"
  />
</template>
<script setup lang="ts">
import StrategyAnalysisGraphView from '../views/StrategyAnalysisGraphView.vue'
import { TradingApi } from '../../trading-api.ts'
import { onMounted, ref, watch } from 'vue'
import type { TimeInterval } from '../../types/time-interval.ts'
import type { StrategyAnalysis } from '../../types/strategy-analysis.ts'
import GraphSkeleton from '../skeletons/GraphSkeleton.vue'
import CardError from '../errors/CardError.vue'

const props = defineProps({
  symbol: {
    type: String,
    required: true,
  },
})

const api = new TradingApi()
const interval = ref<TimeInterval>('all')
const strategyAnalysis = ref<StrategyAnalysis>()
const isLoadingStrategyAnalysis = ref(true)
const hasErrorStrategyAnalysis = ref(false)

onMounted(() => {
  fetchStrategyAnalysis()
})

watch(interval, () => {
  fetchStrategyAnalysis()
})

async function fetchStrategyAnalysis() {
  hasErrorStrategyAnalysis.value = false
  isLoadingStrategyAnalysis.value = true
  try {
    strategyAnalysis.value = await api.getStrategyAnalysisGraph(props.symbol, interval.value)
  } catch (error) {
    hasErrorStrategyAnalysis.value = true
  } finally {
    isLoadingStrategyAnalysis.value = false
  }
}
</script>
