<template>
  <PerformanceSkeleton v-if="isLoadingPerformance || !performance" />
  <CardError title="Performance" v-else-if="hasErrorPerformance" />
  <PerformanceView v-else :performance="performance" />
</template>
<script setup lang="ts">
import PerformanceSkeleton from '../skeletons/PerformanceSkeleton.vue'
import CardError from '../errors/CardError.vue'
import PerformanceView from '../views/PerformanceView.vue'
import { onMounted, ref } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import type { Performance as PerformanceType } from '../../types/performance.ts'

const api = new TradingApi()
const performance = ref<PerformanceType>()
const isLoadingPerformance = ref(true)
const hasErrorPerformance = ref(false)

onMounted(() => {
  fetchPerformance()
})

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
