<template>
  <StatusSkeleton v-if="isLoadingUptime" />
  <CardError title="Status" v-else-if="hasErrorUptime" />
  <Status v-else :uptime="uptime" />

  <PerformanceSkeleton v-if="isLoadingPerformance" />
  <CardError title="Performance" v-else-if="hasErrorPerformance" />
  <Performance v-else :performance="performance" />
</template>
<script setup lang="ts">
import Status from './Status.vue'
import StatusSkeleton from '../skeletons/StatusSkeleton.vue'
import CardError from '../errors/CardError.vue'
import { TradingApi } from '../../trading-api.ts'
import { ref, onMounted } from 'vue'
import type { Performance as PerformanceType } from '../../types/performance.ts'
import PerformanceSkeleton from '../skeletons/PerformanceSkeleton.vue'
import Performance from './Performance.vue'

const api = new TradingApi()
const uptime = ref<Number>(0)
const performance = ref<PerformanceType>({
  trades: 0,
  success: 0,
  failed: 0,
  pnl: 0,
  fees: 0,
  net: 0,
})

const isLoadingUptime = ref(true)
const hasErrorUptime = ref(false)
const isLoadingPerformance = ref(true)
const hasErrorPerformance = ref(false)

onMounted(() => {
  fetchUptime()
  fetchPerformance()
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

async function fetchPerformance() {
  hasErrorPerformance.value = false
  isLoadingPerformance.value = true
  try {
    performance.value = await api.getFullPerformance()
  } catch (error) {
    hasErrorPerformance.value = true
  } finally {
    isLoadingPerformance.value = false
  }
}
</script>
