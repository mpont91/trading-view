<template>
  <StrategiesSkeleton title="Last strategies" v-if="isLoadingStrategies" />
  <CardError title="Last strategies" v-else-if="hasErrorStrategies" />
  <StrategiesView v-else title="Last strategies" :strategies="strategies" />
</template>
<script setup lang="ts">
import StrategiesView from '../views/StrategiesView.vue'
import StrategiesSkeleton from '../skeletons/StrategiesSkeleton.vue'
import CardError from '../errors/CardError.vue'
import { onMounted, ref } from 'vue'
import { TradingApi } from '../../trading-api.ts'
import type { Strategy } from '../../types/strategy.ts'

const props = defineProps({
  symbol: {
    type: String,
    default: '',
  },
})

const api = new TradingApi()
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
