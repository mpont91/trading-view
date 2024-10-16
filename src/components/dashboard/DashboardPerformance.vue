<template>
  <div class="bg-neutral-800 shadow p-6 mb-6">
    <h2>Performance</h2>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <div class="bg-green-950 text-green-300 p-4">
        <p>
          Total trades:
          <span class="font-semibold">{{ performance.total_trades }}</span>
        </p>
      </div>
      <div class="bg-green-950 text-green-300 p-4">
        <p>
          Successful trades:
          <span class="font-semibold">{{ performance.successful_trades }}</span>
        </p>
      </div>
      <div class="bg-red-950 text-red-300 p-4">
        <p>
          Failed trades:
          <span class="font-semibold">{{ performance.failed_trades }}</span>
        </p>
      </div>
      <div class="bg-blue-950 text-blue-300 p-4">
        <p>
          PnL:
          <span class="font-semibold">
            {{ formatAmount(performance.total_pnl) }}
          </span>
          ({{ formatPercentage(performance.total_pnl_percentage) }})
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatAmount, formatPercentage } from '../../utils.ts'
import type { PropType } from 'vue'
import type { DashboardPerformance } from '../../models/dashboard.ts'

defineProps({
  performance: {
    type: Object as PropType<DashboardPerformance>,
    required: true,
  },
})
</script>
