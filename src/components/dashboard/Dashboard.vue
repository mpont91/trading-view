<template>
  <ErrorMessage v-if="hasError" message="Couldn't fetch the dashboard!" />
  <Loading v-if="isLoading" />
  <div v-if="!hasError && !isLoading" class="mx-auto py-4">
    <DashboardStatus v-if="dashboard?.status" :status="dashboard.status" />
    <DashboardHoldings />
    <DashboardPerformance
      v-if="dashboard?.performance"
      :performance="dashboard.performance"
    />
    <DashboardCommissions
      v-if="dashboard?.commissions && dashboard?.performance"
      :commissions="dashboard.commissions"
      :performance="dashboard.performance"
    />
    <DashboardBalances
      v-if="dashboard?.balances && dashboard?.pairs"
      :balances="dashboard.balances"
      :pairs="dashboard.pairs"
    />
    <DashboardOpenedPositions
      v-if="dashboard?.opened_positions && dashboard?.pairs"
      :positions="dashboard.opened_positions"
      :pairs="dashboard.pairs"
    />
    <DashboardLogs v-if="dashboard?.logs" :logs="dashboard.logs" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDashboard } from '../../api.ts'
import DashboardStatus from './DashboardStatus.vue'
import DashboardOpenedPositions from './DashboardOpenedPositions.vue'
import DashboardPerformance from './DashboardPerformance.vue'
import DashboardLogs from './DashboardLogs.vue'
import ErrorMessage from '../shared/ErrorMessage.vue'
import DashboardBalances from './DashboardBalances.vue'
import type { Dashboard } from '../../models/dashboard.ts'
import DashboardCommissions from './DashboardCommissions.vue'
import Loading from '../shared/Loading.vue'
import DashboardHoldings from './DashboardHoldings.vue'

const hasError = ref<boolean>(false)
const dashboard = ref<Dashboard | null>(null)
const isLoading = ref<boolean>(true)

onMounted(async () => {
  await refresh()
})

async function refresh() {
  isLoading.value = true
  dashboard.value = null
  try {
    dashboard.value = await getDashboard()
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>
