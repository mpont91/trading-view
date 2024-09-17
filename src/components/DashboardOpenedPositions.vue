<template>
  <div class="bg-neutral-800 rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">Opened positions</h2>
    <div class="overflow-x-auto">
      <PositionsDataTable :positions="positions" :markets="markets" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Market, Position } from '../types.ts'
import PositionsDataTable from './PositionsDataTable.vue'

const props = defineProps({
  positions: {
    type: Array<Position>,
    default: [],
  },
  markets: {
    type: Array<Market>,
    default: [],
  },
})
</script>
