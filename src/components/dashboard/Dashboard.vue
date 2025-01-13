<template>
  <StatusSkeleton v-if="isLoadingUptime" />
  <CardError title="Status" v-else-if="hasErrorUptime" />
  <Status v-else :uptime="uptime" />

  <HoldingGraphSkeleton v-if="isLoadingHoldings" />
  <CardError title="Holdings" v-else-if="hasErrorHoldings" />
  <HoldingGraph v-else v-model="interval" :holdings="holdings" />

  <PerformanceSkeleton v-if="isLoadingPerformance" />
  <CardError title="Performance" v-else-if="hasErrorPerformance" />
  <Performance v-else :performance="performance" />

  <template v-if="tradingMode === 'spot'">
    <CommissionAvailableSkeleton v-if="isLoadingCommissionAvailable" />
    <CardError
      title="Commission available"
      v-else-if="hasErrorCommissionAvailable"
    />
    <CommissionAvailable v-else :commission-available="commissionAvailable" />
  </template>

  <LatestTradesSkeleton v-if="isLoadingLatestTrades" />
  <CardError title="Latest trades" v-else-if="hasErrorLatestTrades" />
  <LatestTrades v-else :trades="latestTrades" />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { PropType } from 'vue'
import { TradingApi } from '../../trading-api'
import type { Holding } from '../../models/holding.ts'
import type { TimeInterval } from '../../types/time-interval.ts'
import type { Performance as PerformanceType } from '../../types/performance.ts'
import type { CommissionAvailable as CommissionAvailableType } from '../../types/commission-available.ts'
import HoldingGraph from './HoldingGraph.vue'
import Performance from './Performance.vue'
import HoldingGraphSkeleton from '../skeletons/HoldingGraphSkeleton.vue'
import PerformanceSkeleton from '../skeletons/PerformanceSkeleton.vue'
import CardError from '../errors/CardError.vue'
import type { TradingMode } from '../../types/trading-mode.ts'
import CommissionAvailable from './CommissionAvailable.vue'
import Status from './Status.vue'
import StatusSkeleton from '../skeletons/StatusSkeleton.vue'
import LatestTrades from './LatestTrades.vue'
import type { Trade } from '../../types/trade.ts'
import LatestTradesSkeleton from '../skeletons/LatestTradesSkeleton.vue'
import CommissionAvailableSkeleton from '../skeletons/CommissionAvailableSkeleton.vue'

const props = defineProps({
  tradingMode: {
    type: String as PropType<TradingMode>,
    required: true,
  },
})

const api = new TradingApi(props.tradingMode)
const uptime = ref<Number>(0)
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
  amount: 0,
  symbol: '',
  quantity: 0,
})
const latestTrades = ref<Trade[]>([])

const isLoadingUptime = ref(true)
const hasErrorUptime = ref(false)
const isLoadingHoldings = ref(true)
const hasErrorHoldings = ref(false)
const isLoadingPerformance = ref(true)
const hasErrorPerformance = ref(false)
const isLoadingCommissionAvailable = ref(true)
const hasErrorCommissionAvailable = ref(false)
const isLoadingLatestTrades = ref(true)
const hasErrorLatestTrades = ref(false)

onMounted(() => {
  fetchUptime()
  fetchHoldings()
  fetchPerformance()
  fetchLatestTrades()

  if (props.tradingMode === 'spot') {
    fetchCommissionAvailable()
  }
})

watch(interval, () => {
  fetchHoldings()
})

async function fetchUptime() {
  hasErrorUptime.value = false
  isLoadingUptime.value = true
  try {
    uptime.value = await api.getUptime()
  } catch (error) {
    hasErrorUptime.value = true
  } finally {
    isLoadingUptime.value = false
  }
}

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

async function fetchCommissionAvailable() {
  hasErrorCommissionAvailable.value = false
  isLoadingCommissionAvailable.value = true
  try {
    commissionAvailable.value = await api.getCommissionAvailable()
  } catch (error) {
    hasErrorCommissionAvailable.value = true
  } finally {
    isLoadingCommissionAvailable.value = false
  }
}

async function fetchLatestTrades() {
  hasErrorLatestTrades.value = false
  isLoadingLatestTrades.value = true
  try {
    latestTrades.value = await api.getLatestTrades()
  } catch (error) {
    hasErrorLatestTrades.value = true
  } finally {
    isLoadingLatestTrades.value = false
  }
}
</script>
