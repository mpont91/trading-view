<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the dashboard!"
  />
  <div v-else-if="hasError === false" class="mx-auto py-4">
    <DashboardStatus v-if="dashboard?.status" :status="dashboard.status" />
    <DashboardLifetime
      v-if="dashboard?.lifetime"
      :lifetime="dashboard.lifetime"
    />
    <DashboardPerformance
      v-if="dashboard?.performance"
      :performance="dashboard.performance"
    />
    <DashboardBalances
      v-if="dashboard?.balances && dashboard?.markets"
      :balances="dashboard.balances"
      :markets="dashboard.markets"
    />
    <DashboardOpenedPositions
      v-if="dashboard?.opened_positions && dashboard?.markets"
      :positions="dashboard.opened_positions"
      :markets="dashboard.markets"
    />
    <DashboardLogs v-if="dashboard?.logs" :logs="dashboard.logs" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDashboard } from '../api'
import DashboardStatus from './DashboardStatus.vue'
import DashboardOpenedPositions from './DashboardOpenedPositions.vue'
import DashboardPerformance from './DashboardPerformance.vue'
import DashboardLogs from './DashboardLogs.vue'
import RefreshButton from './RefreshButton.vue'
import ErrorMessage from './ErrorMessage.vue'
import DashboardBalances from './DashboardBalances.vue'
import type { Dashboard } from '../types.ts'
import DashboardLifetime from './DashboardLifetime.vue'

const hasError = ref<null | boolean>(null)
const dashboard = ref<Dashboard | null>(null)

onMounted(async () => {
  await refresh()
})

async function refresh() {
  dashboard.value = null
  try {
    dashboard.value = await getDashboard()
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
}
</script>
