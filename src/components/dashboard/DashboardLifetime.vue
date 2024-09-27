<template>
  <div class="bg-neutral-800 rounded-lg shadow p-6 mb-6">
    <h2>Lifetime</h2>
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
          Current value:
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
        <p>Total invested in commissions:</p>
        <p class="font-semibold">
          {{ formatNumber(lifetime.total_invested_commission_bnb) }} BNB
        </p>
        <p class="font-semibold">
          {{ formatAmount(lifetime.total_invested_commission) }}
        </p>
      </div>
      <div class="bg-yellow-950 text-yellow-300 p-4 rounded-lg">
        <p>Current value available:</p>
        <p class="font-semibold">
          {{ formatNumber(lifetime.current_commission_value_bnb) }} BNB
        </p>
        <p class="font-semibold">
          {{ formatAmount(lifetime.current_commission_value) }}
        </p>
      </div>
      <div class="bg-yellow-950 text-yellow-300 p-4 rounded-lg">
        <p>Total commissions paid:</p>
        <p class="font-semibold">
          {{
            formatNumber(
              lifetime.total_invested_commission_bnb -
                lifetime.current_commission_value_bnb,
            )
          }}
          BNB
        </p>
        <p class="font-semibold">
          {{
            formatAmount(
              lifetime.total_invested_commission -
                lifetime.current_commission_value,
            )
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { DashboardLifetime } from '../../types.ts'
import { formatAmount, formatNumber, formatPercentage } from '../../utils.ts'

defineProps({
  lifetime: {
    type: Object as PropType<DashboardLifetime>,
    required: true,
  },
})
</script>
