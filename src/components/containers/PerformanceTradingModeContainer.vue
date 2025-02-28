<template>
  <PerformanceSkeleton v-if="isLoadingPerformance" />
  <CardError title="Performance" v-else-if="hasErrorPerformance" />
  <PerformanceView v-else :performance="performance" />
</template>
<script setup lang="ts">
import PerformanceSkeleton from '../skeletons/PerformanceSkeleton.vue'
import CardError from '../errors/CardError.vue'
import PerformanceView from '../views/PerformanceView.vue'
import { onMounted, ref } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import { createEmptyPerformance } from '../../helpers/performance-helper.ts'
import type { PropType } from 'vue'
import type { Performance as PerformanceType } from '../../types/performance.ts'
import type { TradingMode } from '../../types/trading-mode.ts'

const props = defineProps({
  tradingMode: {
    type: String as PropType<TradingMode>,
    required: true,
  },
})

const api = new TradingApi(props.tradingMode)
const performance = ref<PerformanceType>(createEmptyPerformance())
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
