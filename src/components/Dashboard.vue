<template>
  <HoldingGraph v-model="interval" :holdings="holdings" />
</template>
<script setup lang="ts">
import { getHoldingGraph } from '../api.ts'
import { onMounted, ref, watch } from 'vue'
import type { Holding } from '../models/holding.ts'
import HoldingGraph from './HoldingGraph.vue'
import type { TimeInterval } from '../types/time-interval.ts'

const interval = ref<TimeInterval>('all')
const holdings = ref<Holding[]>([])

onMounted(async () => {
  await refresh()
})

watch(interval, async () => {
  await refresh()
})

async function refresh() {
  holdings.value = await getHoldingGraph(interval.value)
}
</script>
