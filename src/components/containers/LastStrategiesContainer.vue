<template>
  <StrategiesSkeleton
    :title="`Last strategies ${tradingMode}`"
    v-if="isLoadingStrategies"
  />
  <CardError
    :title="`Last strategies ${tradingMode}`"
    v-else-if="hasErrorStrategies"
  />
  <StrategiesView
    v-else
    :title="`Last strategies ${tradingMode}`"
    :strategies="strategies"
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
const strategies = ref<Strategy[]>([])
const isLoadingStrategies = ref(true)
const hasErrorStrategies = ref(false)

onMounted(() => {
  fetchStrategies()
})

async function fetchStrategies() {
  hasErrorStrategies.value = false
  isLoadingStrategies.value = true
  try {
    strategies.value = await api.getStrategies(props.symbol)
  } catch (error) {
    hasErrorStrategies.value = true
  } finally {
    isLoadingStrategies.value = false
  }
}
</script>
