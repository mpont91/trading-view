<template>
  <div class="bg-neutral-800 shadow p-6 mb-6">
    <h2>Commissions</h2>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="bg-yellow-950 text-yellow-300 p-4">
        <p>
          Total available:
          <span class="font-semibold">
            {{ formatNumber(commissions.quantity_available) }}
            {{ commissionsCurrency }} ({{
              formatAmount(commissions.amount_available)
            }})
          </span>
        </p>
      </div>
      <div class="bg-yellow-950 text-yellow-300 p-4">
        <p>
          Total paid:
          <span class="font-semibold">
            <span class="font-semibold">
              {{ formatNumber(performance.total_commission_quantity_paid) }}
              {{ commissionsCurrency }} ({{
                formatAmount(performance.total_commission_amount_paid)
              }})
            </span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type {
  DashboardCommissions,
  DashboardPerformance,
} from '../../models/dashboard.ts'
import { formatAmount, formatNumber } from '../../helpers/format-helper.ts'
import { commissionsCurrency } from '../../helpers/pairs-helper.ts'

defineProps({
  commissions: {
    type: Object as PropType<DashboardCommissions>,
    required: true,
  },
  performance: {
    type: Object as PropType<DashboardPerformance>,
    required: true,
  },
})
</script>
