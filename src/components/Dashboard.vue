<template>
  <HoldingGraphSkeleton v-if="isLoadingHoldings" />
  <HoldingGraph v-else v-model="interval" :holdings="holdings" />
  <PerformanceSkeleton v-if="isLoadingPerformance" />
  <Performance v-else :performance="performance" />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getHoldingGraph, getPerformance } from '../api.ts'
import type { Holding } from '../models/holding.ts'
import type { TimeInterval } from '../types/time-interval.ts'
import type { Performance as PerformanceType } from '../types/performance.ts'
import HoldingGraph from './HoldingGraph.vue'
import Performance from './Performance.vue'
import HoldingGraphSkeleton from './skeletons/HoldingGraphSkeleton.vue'
import PerformanceSkeleton from './skeletons/PerformanceSkeleton.vue'

const interval = ref<TimeInterval>('all')
const holdings = ref<Holding[]>([])
const performance = ref<PerformanceType>({
  trades: 0,
  success: 0,
  failed: 0,
  pnl: 0,
})

const isLoadingHoldings = ref(true)
const isLoadingPerformance = ref(true)

onMounted(() => {
  fetchHoldings()
  fetchPerformance()
})

watch(interval, () => {
  fetchHoldings()
})

async function fetchHoldings() {
  isLoadingHoldings.value = true
  holdings.value = await getHoldingGraph(interval.value)
  isLoadingHoldings.value = false
}

async function fetchPerformance() {
  isLoadingPerformance.value = true
  performance.value = await getPerformance()
  isLoadingPerformance.value = false
}
</script>
