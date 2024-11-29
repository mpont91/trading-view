<template>
  <HoldingGraph :holdings="holdings" />
</template>
<script setup lang="ts">
import { getHoldingGraph } from '../api.ts'
import { onMounted, ref } from 'vue'
import type { Holding } from '../models/holding.ts'
import HoldingGraph from './HoldingGraph.vue'

const holdings = ref<Holding[]>([])

onMounted(async () => {
  await refresh()
})

async function refresh() {
  holdings.value = await getHoldingGraph('all')
}
</script>
