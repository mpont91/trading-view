<template>
  <div class="mx-auto py-4">
    <DashboardStatus />
    <DashboardPerformance />
    <DashboardOpenedPositions />
    <DashboardLogs />
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
  try {
    dashboard.value = await getDashboard()
  } catch (error: unknown) {
    hasError.value = true
  }
})
</script>

<style scoped></style>
