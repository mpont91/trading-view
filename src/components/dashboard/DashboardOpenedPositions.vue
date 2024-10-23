<template>
  <div class="bg-neutral-800 shadow p-6 mb-6">
    <h2>Opened positions</h2>
    <div class="overflow-x-auto">
      <PositionsOpenedDataTable :positions="positions" :pairs="pairs" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Pair } from '../../models/pair.ts'
import type { Position } from '../../models/position.ts'
import PositionsOpenedDataTable from '../positions/PositionsOpenedDataTable.vue'

defineProps({
  positions: {
    type: Array as PropType<Position[]>,
    default: () => [],
  },
  pairs: {
    type: Array as PropType<Pair[]>,
    default: () => [],
  },
})
</script>
