<template>
  <div class="mx-auto py-4">
    <button
      type="button"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      @click="refresh"
    >
      Refresh
    </button>
    <DashboardStatus v-if="dashboard" />
    <DashboardPerformance
      v-if="dashboard"
      :performance="dashboard.performance"
    />
    <DashboardOpenedPositions
      v-if="dashboard"
      :positions="dashboard.opened_positions"
    />
    <DashboardLogs v-if="dashboard" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDashboard } from '../api'
import DashboardStatus from './DashboardStatus.vue'
import DashboardOpenedPositions from './DashboardOpenedPositions.vue'
import DashboardPerformance from './DashboardPerformance.vue'
import DashboardLogs from './DashboardLogs.vue'

const hasError = ref<null | boolean>(null)
const dashboard = ref()

onMounted(async () => {
  await refresh()
})

async function refresh() {
  dashboard.value = null
  try {
    dashboard.value = await getDashboard()
  } catch (error: unknown) {
    hasError.value = true
  }
}
</script>

<style scoped></style>
