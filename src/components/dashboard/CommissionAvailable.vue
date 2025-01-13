<template>
  <Card>
    <h2>Commission available</h2>
    <div class="grid grid-cols-1">
      <div class="bg-amber-950 text-amber-300 p-4">
        <p>
          <span class="font-semibold">
            {{ formatNumber(commissionAvailable.quantity) }}
            {{ commissionAvailable.symbol }} ({{
              formatAmount(commissionAvailable.amount)
            }})
          </span>
        </p>
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from '../Card.vue'
import { formatAmount, formatNumber } from '../../helpers/format-helper.ts'
import type { PropType } from 'vue'
import type { CommissionAvailable } from '../../types/commission-available.ts'

defineProps({
  commissionAvailable: {
    type: Object as PropType<CommissionAvailable>,
    required: true,
  },
})
</script>
