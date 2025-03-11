<template>
  <LastTradesSkeleton v-if="isLoadingLastTrades" />
  <CardError title="Last trades" v-else-if="hasErrorLastTrades" />
  <LastTradesView v-else :trades="lastTrades" />
</template>
<script setup lang="ts">
import LastTradesSkeleton from '../skeletons/LastTradesSkeleton.vue'
import LastTradesView from '../views/LastTradesView.vue'
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
const lastTrades = ref<Trade[]>([])
const isLoadingLastTrades = ref(true)
const hasErrorLastTrades = ref(false)

onMounted(() => {
  fetchLastTrades()
})

async function fetchLastTrades() {
  hasErrorLastTrades.value = false
  isLoadingLastTrades.value = true
  try {
    lastTrades.value = await api.getLastTrades()
  } catch (error) {
    hasErrorLastTrades.value = true
  } finally {
    isLoadingLastTrades.value = false
  }
}
</script>
