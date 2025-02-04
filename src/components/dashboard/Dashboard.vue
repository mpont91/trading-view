<template>
  <EquityGraphSkeleton v-if="isLoadingEquity" />
  <CardError title="Equity" v-else-if="hasErrorEquity" />
  <EquityGraph v-else v-model="interval" :equity="equity" />

  <PerformanceSkeleton v-if="isLoadingPerformance" />
  <CardError title="Performance" v-else-if="hasErrorPerformance" />
  <Performance v-else :performance="performance" />

  <template v-if="tradingMode === 'spot'">
    <CommissionEquitySkeleton v-if="isLoadingCommissionEquity" />
    <CardError
      title="Commission available"
      v-else-if="hasErrorCommissionEquity"
    />
    <CommissionEquity v-else :commission-equity="commissionEquity" />
  </template>

  <LatestTradesSkeleton v-if="isLoadingLatestTrades" />
  <CardError title="Latest trades" v-else-if="hasErrorLatestTrades" />
  <LatestTrades v-else :trades="latestTrades" />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { PropType } from 'vue'
import { TradingApi } from '../../trading-api'
import type { Equity } from '../../models/equity.ts'
import type { TimeInterval } from '../../types/time-interval.ts'
import type { Performance as PerformanceType } from '../../types/performance.ts'
import type { CommissionEquity as CommissionEquityType } from '../../models/commission-equity.ts'
import Performance from './Performance.vue'
import PerformanceSkeleton from '../skeletons/PerformanceSkeleton.vue'
import CardError from '../errors/CardError.vue'
import type { TradingMode } from '../../types/trading-mode.ts'
import LatestTrades from './LatestTrades.vue'
import type { Trade } from '../../types/trade.ts'
import LatestTradesSkeleton from '../skeletons/LatestTradesSkeleton.vue'
import CommissionEquity from './CommissionEquity.vue'
import EquityGraph from './EquityGraph.vue'
import EquityGraphSkeleton from '../skeletons/EquityGraphSkeleton.vue'
import CommissionEquitySkeleton from '../skeletons/CommissionEquitySkeleton.vue'

const props = defineProps({
  tradingMode: {
    type: String as PropType<TradingMode>,
    required: true,
  },
})

const api = new TradingApi(props.tradingMode)
const interval = ref<TimeInterval>('all')
const equity = ref<Equity[]>([])
const performance = ref<PerformanceType>({
  trades: 0,
  success: 0,
  failed: 0,
  pnl: 0,
  fees: 0,
  net: 0,
})
const commissionEquity = ref<CommissionEquityType>({
  amount: 0,
  currency: '',
  quantity: 0,
})
const latestTrades = ref<Trade[]>([])
const isLoadingEquity = ref(true)
const hasErrorEquity = ref(false)
const isLoadingPerformance = ref(true)
const hasErrorPerformance = ref(false)
const isLoadingCommissionEquity = ref(true)
const hasErrorCommissionEquity = ref(false)
const isLoadingLatestTrades = ref(true)
const hasErrorLatestTrades = ref(false)

onMounted(() => {
  fetchEquity()
  fetchPerformance()
  fetchLatestTrades()

  if (props.tradingMode === 'spot') {
    fetchCommissionEquity()
  }
})

watch(interval, () => {
  fetchEquity()
})

async function fetchEquity() {
  hasErrorEquity.value = false
  isLoadingEquity.value = true
  try {
    equity.value = await api.getEquityGraph(interval.value)
  } catch (error) {
    hasErrorEquity.value = true
  } finally {
    isLoadingEquity.value = false
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

async function fetchCommissionEquity() {
  hasErrorCommissionEquity.value = false
  isLoadingCommissionEquity.value = true
  try {
    commissionEquity.value = await api.getCommissionEquity()
  } catch (error) {
    hasErrorCommissionEquity.value = true
  } finally {
    isLoadingCommissionEquity.value = false
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
