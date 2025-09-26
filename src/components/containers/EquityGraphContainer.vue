<template>
  <GraphSkeleton title="Equity" v-if="isLoadingEquity" />
  <CardError title="Equity" v-else-if="hasErrorEquity" />
  <EquityGraphView v-else v-model="interval" :equity="equity" />
</template>
<script setup lang="ts">
import EquityGraphView from '../views/EquityGraphView.vue'
import GraphSkeleton from '../skeletons/GraphSkeleton.vue'
import CardError from '../errors/CardError.vue'
import { onMounted, ref, watch } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import { TimeInterval } from '../../types/time-interval.ts'
import type { Equity } from '../../types/equity.ts'

const api = new TradingApi()
const interval = ref<TimeInterval>(TimeInterval.ALL)
const equity = ref<Equity[]>([])
const isLoadingEquity = ref(true)
const hasErrorEquity = ref(false)

onMounted(() => {
  fetchEquity()
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
</script>
