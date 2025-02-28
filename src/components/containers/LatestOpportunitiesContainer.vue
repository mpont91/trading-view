<template>
  <StrategiesSkeleton
    title="Latest opportunities"
    v-if="isLoadingOpportunities"
  />
  <CardError title="Latest opportunities" v-else-if="hasErrorOpportunities" />
  <StrategiesView
    title="Latest opportunities"
    v-else
    :strategies="opportunities"
  />
</template>
<script setup lang="ts">
import StrategiesView from '../views/StrategiesView.vue'
import StrategiesSkeleton from '../skeletons/StrategiesSkeleton.vue'
import CardError from '../errors/CardError.vue'
import { onMounted, ref } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import type { Strategy } from '../../types/strategy.ts'

const api = new TradingApi()
const opportunities = ref<Strategy[]>([])
const isLoadingOpportunities = ref(true)
const hasErrorOpportunities = ref(false)

onMounted(() => {
  fetchLatestOpportunities()
})

async function fetchLatestOpportunities() {
  hasErrorOpportunities.value = false
  isLoadingOpportunities.value = true
  try {
    opportunities.value = await api.getLatestOpportunities()
  } catch (error) {
    hasErrorOpportunities.value = true
  } finally {
    isLoadingOpportunities.value = false
  }
}
</script>
