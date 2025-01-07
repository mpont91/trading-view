<template>
  <HoldingGraphSkeleton v-if="isLoadingHoldings" />
  <CardError title="Holdings" v-else-if="hasErrorHoldings" />
  <HoldingGraph v-else v-model="interval" :holdings="holdings" />
  <PerformanceSkeleton v-if="isLoadingPerformance" />
  <CardError title="Performance" v-else-if="hasErrorPerformance" />
  <Performance v-else :performance="performance" />
  <CommissionAvailable
    v-if="tradingMode === 'spot'"
    :commission-available="commissionAvailable"
  />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { PropType } from 'vue'
import { TradingApi } from '../trading-api.ts'
import type { Holding } from '../models/holding.ts'
import type { TimeInterval } from '../types/time-interval.ts'
import type { Performance as PerformanceType } from '../types/performance.ts'
import type { CommissionAvailable as CommissionAvailableType } from '../types/commission-available.ts'
import HoldingGraph from './HoldingGraph.vue'
import Performance from './Performance.vue'
import HoldingGraphSkeleton from './skeletons/HoldingGraphSkeleton.vue'
import PerformanceSkeleton from './skeletons/PerformanceSkeleton.vue'
import CardError from './errors/CardError.vue'
import type { TradingMode } from '../types/trading-mode.ts'
import CommissionAvailable from './CommissionAvailable.vue'

const props = defineProps({
  tradingMode: {
    type: Object as PropType<TradingMode>,
    required: true,
  },
})

const api = new TradingApi(props.tradingMode)
const interval = ref<TimeInterval>('all')
const holdings = ref<Holding[]>([])
const performance = ref<PerformanceType>({
  trades: 0,
  success: 0,
  failed: 0,
  pnl: 0,
  fees: 0,
  net: 0,
})
const commissionAvailable = ref<CommissionAvailableType>({
  id: 1,
  amount: 0,
  quantity: 0,
  createdAt: new Date(),
})

const isLoadingHoldings = ref(true)
const hasErrorHoldings = ref(false)
const isLoadingPerformance = ref(true)
const hasErrorPerformance = ref(false)

onMounted(() => {
  fetchHoldings()
  fetchPerformance()
})

watch(interval, () => {
  fetchHoldings()
})

async function fetchHoldings() {
  hasErrorHoldings.value = false
  isLoadingHoldings.value = true
  try {
    holdings.value = await api.getHoldingGraph(interval.value)
  } catch (error) {
    hasErrorHoldings.value = true
  } finally {
    isLoadingHoldings.value = false
  }
}

async function fetchPerformance() {
  hasErrorPerformance.value = false
  isLoadingPerformance.value = true
  try {
    performance.value = await api.getPerformance()
  } catch (error) {
    hasErrorPerformance.value = true
  } finally {
    isLoadingPerformance.value = false
  }
}
</script>
