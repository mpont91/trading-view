<template>
  <GraphSkeleton title="Signals" v-if="isLoadingSignals" />
  <CardError title="Signals" v-else-if="hasErrorSignals" />
  <SignalsGraphView
    v-else
    title="Signals"
    v-model="interval"
    :signals="signals"
  />
</template>
<script setup lang="ts">
import SignalsGraphView from '../views/SignalsGraphView.vue'
import { TradingApi } from '../../trading-api.ts'
import { onMounted, ref, watch } from 'vue'
import type { TimeInterval } from '../../types/time-interval.ts'
import type { Signals } from '../../types/signals.ts'
import GraphSkeleton from '../skeletons/GraphSkeleton.vue'
import CardError from '../errors/CardError.vue'

const props = defineProps({
  symbol: {
    type: String,
    required: true,
  },
})

const api = new TradingApi()
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
