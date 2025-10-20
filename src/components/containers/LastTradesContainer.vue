<template>
  <TableSkeleton title="Last trades" v-if="isLoadingLastTrades" />
  <CardError title="Last trades" v-else-if="hasErrorLastTrades" />
  <LastTradesView v-else :trades="lastTrades" />
</template>
<script setup lang="ts">
import LastTradesView from '../views/LastTradesView.vue'
import CardError from '../errors/CardError.vue'
import { onMounted, ref } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import type { Trade } from '../../types/trade.ts'
import TableSkeleton from '../skeletons/TableSkeleton.vue'

const props = defineProps({
  symbol: {
    type: String,
    default: '',
  },
})

const api = new TradingApi()
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
    lastTrades.value = await api.getLastTrades(props.symbol)
  } catch (error) {
    hasErrorLastTrades.value = true
  } finally {
    isLoadingLastTrades.value = false
  }
}
</script>
