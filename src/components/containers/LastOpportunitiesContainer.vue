<template>
  <StrategiesSkeleton
    :title="`Last opportunities ${tradingMode}`"
    v-if="isLoadingOpportunities"
  />
  <CardError
    :title="`Last opportunities ${tradingMode}`"
    v-else-if="hasErrorOpportunities"
  />
  <StrategiesView
    :title="`Last opportunities ${tradingMode}`"
    v-else
    :strategies="opportunities"
  />
</template>
<script setup lang="ts">
import StrategiesView from '../views/StrategiesView.vue'
import StrategiesSkeleton from '../skeletons/StrategiesSkeleton.vue'
import CardError from '../errors/CardError.vue'
import { onMounted, ref, type PropType } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import type { Strategy } from '../../types/strategy.ts'
import type { TradingMode } from '../../types/trading-mode.ts'

const props = defineProps({
  tradingMode: {
    type: String as PropType<TradingMode>,
    required: true,
  },
  symbol: {
    type: String,
    default: '',
  },
})

const api = new TradingApi(props.tradingMode)
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
    opportunities.value = await api.getLastOpportunities(props.symbol)
  } catch (error) {
    hasErrorOpportunities.value = true
  } finally {
    isLoadingOpportunities.value = false
  }
}
</script>
