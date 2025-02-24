<template>
  <StrategiesSkeleton title="Latest strategies" v-if="isLoadingStrategies" />
  <CardError title="Latest strategies" v-else-if="hasErrorStrategies" />
  <Strategies v-else title="Latest strategies" :strategies="strategies" />

  <StrategiesSkeleton
    title="Latest opportunities"
    v-if="isLoadingOpportunities"
  />
  <CardError title="Latest opportunities" v-else-if="hasErrorOpportunities" />
  <Strategies title="Latest opportunities" v-else :strategies="opportunities" />
</template>
<script setup lang="ts">
import Strategies from './Strategies.vue'
import CardError from '../errors/CardError.vue'
import { TradingApi } from '../../trading-api.ts'
import { ref, onMounted } from 'vue'
import type { Strategy } from '../../types/strategy.ts'
import StrategiesSkeleton from '../skeletons/StrategiesSkeleton.vue'

const api = new TradingApi()

const strategies = ref<Strategy[]>([])
const isLoadingStrategies = ref(true)
const hasErrorStrategies = ref(false)
const opportunities = ref<Strategy[]>([])
const isLoadingOpportunities = ref(true)
const hasErrorOpportunities = ref(false)

onMounted(() => {
  fetchStrategies()
  fetchLatestOpportunities()
})

async function fetchStrategies() {
  hasErrorStrategies.value = false
  isLoadingStrategies.value = true
  try {
    strategies.value = await api.getStrategies()
  } catch (error) {
    hasErrorStrategies.value = true
  } finally {
    isLoadingStrategies.value = false
  }
}

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
