<template>
  <EquityGraphSkeleton v-if="isLoadingEquity" />
  <CardError title="Equity" v-else-if="hasErrorEquity" />
  <EquityGraphView v-else v-model="interval" :equity="equity" />
</template>
<script setup lang="ts">
import EquityGraphView from '../views/EquityGraphView.vue'
import EquityGraphSkeleton from '../skeletons/EquityGraphSkeleton.vue'
import CardError from '../errors/CardError.vue'
import { onMounted, ref, watch } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import type { PropType } from 'vue'
import type { TimeInterval } from '../../types/time-interval.ts'
import type { Equity } from '../../types/equity.ts'
import type { TradingMode } from '../../types/trading-mode.ts'

const props = defineProps({
  tradingMode: {
    type: String as PropType<TradingMode>,
    required: true,
  },
})

const api = new TradingApi(props.tradingMode)
const interval = ref<TimeInterval>('all')
const equity = ref<Equity[]>([])
const isLoadingEquity = ref(true)
const hasErrorEquity = ref(false)

onMounted(() => {
  fetchEquity()
})

watch(interval, () => {
  fetchEquity()
})

async function fetchEquity() {
  hasErrorEquity.value = false
  isLoadingEquity.value = true
  try {
    equity.value = await api.getEquityGraph(interval.value)
  } catch (error) {
    hasErrorEquity.value = true
  } finally {
    isLoadingEquity.value = false
  }
}
</script>
