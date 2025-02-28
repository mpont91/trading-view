<template>
  <LatestTradesSkeleton v-if="isLoadingLatestTrades" />
  <CardError title="Latest trades" v-else-if="hasErrorLatestTrades" />
  <LatestTradesView v-else :trades="latestTrades" />
</template>
<script setup lang="ts">
import LatestTradesSkeleton from '../skeletons/LatestTradesSkeleton.vue'
import LatestTradesView from '../views/LatestTradesView.vue'
import CardError from '../errors/CardError.vue'
import { onMounted, ref } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import type { PropType } from 'vue'
import type { TradingMode } from '../../types/trading-mode.ts'
import type { Trade } from '../../types/trade.ts'

const props = defineProps({
  tradingMode: {
    type: String as PropType<TradingMode>,
    required: true,
  },
})

const api = new TradingApi(props.tradingMode)
const latestTrades = ref<Trade[]>([])
const isLoadingLatestTrades = ref(true)
const hasErrorLatestTrades = ref(false)

onMounted(() => {
  fetchLatestTrades()
})

async function fetchLatestTrades() {
  hasErrorLatestTrades.value = false
  isLoadingLatestTrades.value = true
  try {
    latestTrades.value = await api.getLatestTrades()
  } catch (error) {
    hasErrorLatestTrades.value = true
  } finally {
    isLoadingLatestTrades.value = false
  }
}
</script>
