<template>
  <IndicatorsSkeleton v-if="isLoadingIndicators" />
  <CardError title="Indicators" v-else-if="hasErrorIndicators" />
  <Indicators v-else :indicators="indicators" />
</template>
<script setup lang="ts">
import Indicators from './Indicators.vue'
import IndicatorsSkeleton from '../skeletons/IndicatorsSkeleton.vue'
import CardError from '../errors/CardError.vue'
import { TradingApi } from '../../trading-api.ts'
import { ref, onMounted } from 'vue'
import type { Indicator } from '../../types/indicator.ts'

const api = new TradingApi()

const indicators = ref<Indicator[]>([])
const isLoadingIndicators = ref(true)
const hasErrorIndicators = ref(false)

onMounted(() => {
  fetchIndicators()
})

async function fetchIndicators() {
  hasErrorIndicators.value = false
  isLoadingIndicators.value = true
  try {
    indicators.value = await api.getIndicators()
  } catch (error) {
    hasErrorIndicators.value = true
  } finally {
    isLoadingIndicators.value = false
  }
}
</script>
