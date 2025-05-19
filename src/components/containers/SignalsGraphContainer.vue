<template>
  <GraphSkeleton :title="`Signals ${tradingMode}`" v-if="isLoadingSignals" />
  <CardError :title="`Signals ${tradingMode}`" v-else-if="hasErrorSignals" />
  <SignalsGraphView
    v-else
    :title="`Signals ${tradingMode}`"
    v-model="interval"
    :signals="signals"
  />
</template>
<script setup lang="ts">
import SignalsGraphView from '../views/SignalsGraphView.vue'
import { TradingApi } from '../../trading-api.ts'
import { onMounted, ref, watch, type PropType } from 'vue'
import type { TimeInterval } from '../../types/time-interval.ts'
import type { Signals } from '../../types/signals.ts'
import GraphSkeleton from '../skeletons/GraphSkeleton.vue'
import CardError from '../errors/CardError.vue'
import type { TradingMode } from '../../types/trading-mode.ts'

const props = defineProps({
  tradingMode: {
    type: String as PropType<TradingMode>,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
})

const api = new TradingApi(props.tradingMode)
const interval = ref<TimeInterval>('all')
const signals = ref<Signals>()
const isLoadingSignals = ref(true)
const hasErrorSignals = ref(false)

onMounted(() => {
  fetchSignals()
})

watch(interval, () => {
  fetchSignals()
})

async function fetchSignals() {
  hasErrorSignals.value = false
  isLoadingSignals.value = true
  try {
    signals.value = await api.getSignalsGraph(props.symbol, interval.value)
  } catch (error) {
    hasErrorSignals.value = true
  } finally {
    isLoadingSignals.value = false
  }
}
</script>
