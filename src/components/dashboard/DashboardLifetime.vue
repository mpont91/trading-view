<template>
  <div class="bg-neutral-800 shadow p-6 mb-6">
    <h2>Lifetime</h2>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="bg-blue-950 text-blue-300 p-4">
        <p>
          Total invested:
          <span class="font-semibold">
            {{ formatAmount(lifetime.total_invested) }}
          </span>
        </p>
        <p>
          Current value:
          <span class="font-semibold">
            {{ formatAmount(lifetime.current_value) }}
          </span>
        </p>
        <p>
          PnL:
          <span class="font-semibold">
            {{ formatAmount(lifetime.pnl) }}
            ({{ formatPercentage(lifetime.pnl_percentage) }})
          </span>
        </p>
      </div>
      <div class="bg-yellow-950 text-yellow-300 p-4">
        <p>
          Total invested in commissions:
          <span class="font-semibold">
            {{ formatNumber(lifetime.total_invested_commission_quantity) }}
            {{ commissionsCurrency }} ({{
              formatAmount(lifetime.total_invested_commission_amount)
            }})
          </span>
        </p>
        <p>
          Current value available:
          <span class="font-semibold">
            {{ formatNumber(lifetime.current_commission_quantity) }}
            {{ commissionsCurrency }} ({{
              formatAmount(lifetime.current_commission_amount)
            }})
          </span>
        </p>
        <p>
          Total commissions paid:
          <span class="font-semibold">
            {{
              formatNumber(
                lifetime.total_invested_commission_quantity -
                  lifetime.current_commission_quantity,
              )
            }}
            {{ commissionsCurrency }} ({{
              formatAmount(
                lifetime.total_invested_commission_amount -
                  lifetime.current_commission_amount,
              )
            }})
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { DashboardLifetime } from '../../models/dashboard.ts'
import {
  formatAmount,
  formatNumber,
  formatPercentage,
} from '../../helpers/format-helper.ts'
import { commissionsCurrency } from '../../helpers/pairs-helper.ts'

defineProps({
  lifetime: {
    type: Object as PropType<DashboardLifetime>,
    required: true,
  },
})
</script>
