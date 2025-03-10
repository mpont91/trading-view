<template>
  <Card title="Commission available">
    <div class="grid grid-cols-1">
      <div class="bg-amber-950 text-amber-300 p-4">
        <p>
          <span class="font-semibold">
            {{ formatNumber(commissionEquity.quantity) }}
            {{ commissionEquity.currency }} ({{
              formatAmount(commissionEquity.amount)
            }})
          </span>
        </p>
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from '../common/Card.vue'
import { formatAmount, formatNumber } from '../../helpers/format-helper.ts'
import type { PropType } from 'vue'
import type { CommissionEquity } from '../../types/commission-equity.ts'

defineProps({
  commissionEquity: {
    type: Object as PropType<CommissionEquity>,
    required: true,
  },
})
</script>
