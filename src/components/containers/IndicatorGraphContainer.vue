<template>
  <GraphSkeleton title="SMA" v-if="isLoadingSMA" />
  <CardError title="SMA" v-else-if="hasErrorSMA" />
  <IndicatorSMAGraphView v-else title="SMA" v-model="intervalSMA" :sma="sma" />
  <GraphSkeleton title="RSI" v-if="isLoadingRSI" />
  <CardError title="RSI" v-else-if="hasErrorRSI" />
  <IndicatorRSIGraphView v-else title="RSI" v-model="intervalRSI" :rsi="rsi" />
  <GraphSkeleton title="ADX" v-if="isLoadingADX" />
  <CardError title="ADX" v-else-if="hasErrorADX" />
  <IndicatorADXGraphView v-else title="ADX" v-model="intervalADX" :adx="adx" />
  <GraphSkeleton title="ATR" v-if="isLoadingATR" />
  <CardError title="ATR" v-else-if="hasErrorATR" />
  <IndicatorATRGraphView v-else title="ATR" v-model="intervalATR" :atr="atr" />
  <GraphSkeleton title="BB" v-if="isLoadingBB" />
  <CardError title="BB" v-else-if="hasErrorBB" />
  <IndicatorBBGraphView v-else title="BB" v-model="intervalBB" :bb="bb" />
  <GraphSkeleton title="SMACross" v-if="isLoadingSMACross" />
  <CardError title="SMACross" v-else-if="hasErrorSMACross" />
  <IndicatorSMACrossGraphView
    v-else
    title="SMACross"
    v-model="intervalSMACross"
    :smaCross="smaCross"
  />
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import { TimeInterval } from '../../types/time-interval.ts'
import {
  IndicatorName,
  type IndicatorSMA,
  type IndicatorRSI,
  type IndicatorADX,
  type IndicatorATR,
  type IndicatorBB,
  type IndicatorSMACross,
} from '../../types/indicator.ts'
import CardError from '../errors/CardError.vue'
import GraphSkeleton from '../skeletons/GraphSkeleton.vue'
import IndicatorSMAGraphView from '../views/IndicatorSMAGraphView.vue'
import IndicatorRSIGraphView from '../views/IndicatorRSIGraphView.vue'
import IndicatorADXGraphView from '../views/IndicatorADXGraphView.vue'
import IndicatorATRGraphView from '../views/IndicatorATRGraphView.vue'
import IndicatorBBGraphView from '../views/IndicatorBBGraphView.vue'
import IndicatorSMACrossGraphView from '../views/IndicatorSMACrossGraphView.vue'

const api = new TradingApi()
const intervalSMA = ref<TimeInterval>(TimeInterval.ALL)
const sma = ref<IndicatorSMA[]>([])
const isLoadingSMA = ref(true)
const hasErrorSMA = ref(false)
const intervalRSI = ref<TimeInterval>(TimeInterval.ALL)
const rsi = ref<IndicatorRSI[]>([])
const isLoadingRSI = ref(true)
const hasErrorRSI = ref(false)
const intervalADX = ref<TimeInterval>(TimeInterval.ALL)
const adx = ref<IndicatorADX[]>([])
const isLoadingADX = ref(true)
const hasErrorADX = ref(false)
const intervalATR = ref<TimeInterval>(TimeInterval.ALL)
const atr = ref<IndicatorATR[]>([])
const isLoadingATR = ref(true)
const hasErrorATR = ref(false)
const intervalBB = ref<TimeInterval>(TimeInterval.ALL)
const bb = ref<IndicatorBB[]>([])
const isLoadingBB = ref(true)
const hasErrorBB = ref(false)
const intervalSMACross = ref<TimeInterval>(TimeInterval.ALL)
const smaCross = ref<IndicatorSMACross[]>([])
const isLoadingSMACross = ref(true)
const hasErrorSMACross = ref(false)

const props = defineProps({
  symbol: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  fetchSMA()
  fetchRSI()
  fetchADX()
  fetchATR()
  fetchBB()
  fetchSMACross()
})

watch(intervalSMA, () => {
  fetchSMA()
})

watch(intervalRSI, () => {
  fetchRSI()
})

watch(intervalADX, () => {
  fetchADX()
})

watch(intervalATR, () => {
  fetchATR()
})

watch(intervalBB, () => {
  fetchBB()
})

watch(intervalSMACross, () => {
  fetchSMACross()
})

async function fetchSMA() {
  hasErrorSMA.value = false
  isLoadingSMA.value = true
  try {
    sma.value = (await api.getGraphIndicator(
      props.symbol,
      IndicatorName.SMA,
      intervalSMA.value,
    )) as IndicatorSMA[]
  } catch (error) {
    hasErrorSMA.value = true
  } finally {
    isLoadingSMA.value = false
  }
}

async function fetchRSI() {
  hasErrorRSI.value = false
  isLoadingRSI.value = true
  try {
    rsi.value = (await api.getGraphIndicator(
      props.symbol,
      IndicatorName.RSI,
      intervalRSI.value,
    )) as IndicatorRSI[]
  } catch (error) {
    hasErrorRSI.value = true
  } finally {
    isLoadingRSI.value = false
  }
}

async function fetchADX() {
  hasErrorADX.value = false
  isLoadingADX.value = true
  try {
    adx.value = (await api.getGraphIndicator(
      props.symbol,
      IndicatorName.ADX,
      intervalADX.value,
    )) as IndicatorADX[]
  } catch (error) {
    hasErrorADX.value = true
  } finally {
    isLoadingADX.value = false
  }
}

async function fetchATR() {
  hasErrorATR.value = false
  isLoadingATR.value = true
  try {
    atr.value = (await api.getGraphIndicator(
      props.symbol,
      IndicatorName.ATR,
      intervalATR.value,
    )) as IndicatorATR[]
  } catch (error) {
    hasErrorATR.value = true
  } finally {
    isLoadingATR.value = false
  }
}

async function fetchBB() {
  hasErrorBB.value = false
  isLoadingBB.value = true
  try {
    bb.value = (await api.getGraphIndicator(
      props.symbol,
      IndicatorName.BB,
      intervalBB.value,
    )) as IndicatorBB[]
  } catch (error) {
    hasErrorBB.value = true
  } finally {
    isLoadingBB.value = false
  }
}

async function fetchSMACross() {
  hasErrorSMACross.value = false
  isLoadingSMACross.value = true
  try {
    smaCross.value = (await api.getGraphIndicator(
      props.symbol,
      IndicatorName.SMACROSS,
      intervalSMACross.value,
    )) as IndicatorSMACross[]
  } catch (error) {
    hasErrorSMACross.value = true
  } finally {
    isLoadingSMACross.value = false
  }
}
</script>
