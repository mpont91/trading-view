<template>
  <div class="bg-neutral-800 rounded-lg shadow p-6 mb-6">
    <h2>Opened positions</h2>
    <div class="overflow-x-auto">
      <PositionsDataTable
        :positions="positions"
        :markets="markets"
        :fields="fields"
        :can-sort="false"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import PositionsDataTable from '../PositionsDataTable.vue'
import type { Market, Position } from '../../types.ts'

const fields: string[] = [
  'id',
  'pair',
  'quantity',
  'amount',
  'buy_price',
  'buy_at',
  'stop_profit_loss',
  'trailing',
  'pnl',
]

defineProps({
  positions: {
    type: Array as PropType<Position[]>,
    default: () => [],
  },
  markets: {
    type: Array as PropType<Market[]>,
    default: () => [],
  },
})
</script>
