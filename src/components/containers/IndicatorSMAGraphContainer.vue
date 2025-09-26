<template>
  <GraphSkeleton title="SMA" v-if="isLoadingSMA" />
  <CardError title="SMA" v-else-if="hasErrorSMA" />
  <IndicatorSMAGraphView v-else title="SMA" v-model="interval" :sma="sma" />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import { TimeInterval } from '../../types/time-interval.ts'
import { IndicatorName, type IndicatorSMA } from '../../types/indicator.ts'
import CardError from '../errors/CardError.vue'
import GraphSkeleton from '../skeletons/GraphSkeleton.vue'
import IndicatorSMAGraphView from '../views/IndicatorSMAGraphView.vue'

const api = new TradingApi()
const interval = ref<TimeInterval>(TimeInterval.ALL)
const sma = ref<IndicatorSMA[]>([])
const isLoadingSMA = ref(true)
const hasErrorSMA = ref(false)

const props = defineProps({
  symbol: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  fetchSMA()
})

watch(interval, () => {
  fetchSMA()
})

async function fetchSMA() {
  hasErrorSMA.value = false
  isLoadingSMA.value = true
  try {
    sma.value = (await api.getGraphIndicator(
      props.symbol,
      IndicatorName.SMA,
      interval.value,
    )) as IndicatorSMA[]
  } catch (error) {
    hasErrorSMA.value = true
  } finally {
    isLoadingSMA.value = false
  }
}
</script>
