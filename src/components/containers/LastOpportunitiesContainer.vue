<template>
  <StrategiesSkeleton
    title="Last opportunities"
    v-if="isLoadingOpportunities"
  />
  <CardError title="Last opportunities" v-else-if="hasErrorOpportunities" />
  <StrategiesView
    title="Last opportunities"
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
  fetchLastOpportunities()
})

async function fetchLastOpportunities() {
  hasErrorOpportunities.value = false
  isLoadingOpportunities.value = true
  try {
    opportunities.value = await api.getLastOpportunities()
  } catch (error) {
    hasErrorOpportunities.value = true
  } finally {
    isLoadingOpportunities.value = false
  }
}
</script>
