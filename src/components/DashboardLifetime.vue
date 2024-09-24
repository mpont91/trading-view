<template>
  <div class="bg-neutral-800 rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">Lifetime</h2>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div class="bg-blue-950 text-blue-300 p-4 rounded-lg">
        <p>
          Total invested:
          <span class="font-semibold">
            {{ formatAmount(lifetime.total_invested) }}
          </span>
        </p>
      </div>
      <div class="bg-blue-950 text-blue-300 p-4 rounded-lg">
        <p>
          Current value estimated
          <span class="font-semibold">
            {{ formatAmount(lifetime.current_value) }}
          </span>
        </p>
      </div>
      <div class="bg-blue-950 text-blue-300 p-4 rounded-lg">
        <p>
          PnL:
          <span class="font-semibold">
            {{ formatAmount(lifetime.pnl) }}
            ({{ formatPercentage(lifetime.pnl_percentage) }})
          </span>
        </p>
      </div>
      <div class="bg-yellow-950 text-yellow-300 p-4 rounded-lg">
        <p>
          Total invested in commissions:
          <span class="font-semibold">
            {{ formatAmount(lifetime.total_invested_commission) }}
          </span>
        </p>
      </div>
      <div class="bg-yellow-950 text-yellow-300 p-4 rounded-lg">
        <p>
          Current value available:
          <span class="font-semibold">
            {{ formatAmount(lifetime.current_commission_value) }}
          </span>
        </p>
      </div>
      <div class="bg-yellow-950 text-yellow-300 p-4 rounded-lg">
        <p>
          Total commissions paid:
          <span class="font-semibold">
            {{
              formatAmount(
                lifetime.total_invested_commission -
                  lifetime.current_commission_value,
              )
            }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { DashboardLifetime } from '../types.ts'
import { formatAmount, formatPercentage } from '../utils.ts'

defineProps({
  lifetime: {
    type: Object as PropType<DashboardLifetime>,
    required: true,
  },
})
</script>
<style scoped></style>
