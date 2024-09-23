<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the dashboard!"
  />
  <div v-else-if="hasError === false" class="mx-auto py-4">
    <DashboardStatus
      v-if="dashboard"
      :active="dashboard.active"
      :last-activity="dashboard.last_activity"
      :uptime="dashboard.uptime"
    />
    <DashboardBalances
      v-if="dashboard"
      :balances="balances"
      :markets="markets"
    />
    <DashboardPerformance
      v-if="dashboard"
      :total-trades="dashboard.performance.total_trades"
      :successful-trades="dashboard.performance.successful_trades"
      :failed-trades="dashboard.performance.failed_trades"
      :pnl="dashboard.performance.total_pnl"
      :pnl-percentage="dashboard.performance.total_pnl_percentage"
      :best-performing-pair="dashboard.performance.best_performing_pair?.pair"
      :best-performing-trades="
        dashboard.performance.best_performing_pair?.trades
      "
      :best-performing-pnl="dashboard.performance.best_performing_pair?.pnl"
      :best-performing-pnl-percentage="
        dashboard.performance.best_performing_pair?.pnl_percentage
      "
      :worst-performing-pair="dashboard.performance.worst_performing_pair?.pair"
      :worst-performing-trades="
        dashboard.performance.worst_performing_pair?.trades
      "
      :worst-performing-pnl="dashboard.performance.worst_performing_pair?.pnl"
      :worst-performing-pnl-percentage="
        dashboard.performance.worst_performing_pair?.pnl_percentage
      "
    />
    <DashboardOpenedPositions
      v-if="dashboard"
      :positions="dashboard.opened_positions"
      :markets="markets"
    />
    <DashboardLogs
      v-if="dashboard"
      :total-errors="dashboard.logs.total_errors"
      :last-log="dashboard.logs.last_log"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDashboard, getMarkets, getBalances } from '../api'
import DashboardStatus from './DashboardStatus.vue'
import DashboardOpenedPositions from './DashboardOpenedPositions.vue'
import DashboardPerformance from './DashboardPerformance.vue'
import DashboardLogs from './DashboardLogs.vue'
import RefreshButton from './RefreshButton.vue'
import ErrorMessage from './ErrorMessage.vue'
import DashboardBalances from './DashboardBalances.vue'
import type { Dashboard, Market, Balance } from '../types.ts'

const hasError = ref<null | boolean>(null)
const dashboard = ref<Dashboard | null>(null)
const markets = ref<Market[]>()
const balances = ref<Balance[]>()

onMounted(async () => {
  await refresh()
})

async function refresh() {
  dashboard.value = null
  markets.value = []
  balances.value = []
  try {
    const [fetchedDashboard, fetchedMarkets, fetchedBalances] =
      await Promise.all([getDashboard(), getMarkets(), getBalances()])

    dashboard.value = fetchedDashboard
    markets.value = fetchedMarkets
    balances.value = fetchedBalances
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
}
</script>
