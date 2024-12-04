<template>
  <Card>
    <h2>Performance</h2>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <div class="bg-green-950 text-green-300 p-4">
        <p>
          Total trades:
          <span class="font-semibold">{{ performance.trades }}</span>
        </p>
      </div>
      <div class="bg-green-950 text-green-300 p-4">
        <p>
          Successful trades:
          <span class="font-semibold">{{ performance.success }}</span>
        </p>
      </div>
      <div class="bg-red-950 text-red-300 p-4">
        <p>
          Failed trades:
          <span class="font-semibold">{{ performance.failed }}</span>
        </p>
      </div>
      <div class="bg-blue-950 text-blue-300 p-4">
        <p>
          PnL:
          <span class="font-semibold">
            {{ formatAmount(performance.pnl) }}
          </span>
        </p>
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import type { Performance } from '../types/performance.ts'
import type { PropType } from 'vue'
import Card from './Card.vue'
import { formatAmount } from '../helpers/format-helper.ts'

defineProps({
  performance: {
    type: Object as PropType<Performance>,
    default: {
      trades: 0,
      success: 0,
      failed: 0,
      pnl: 0,
    },
  },
})
</script>
