<template>
  <Card>
    <h2>Commission available</h2>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="bg-amber-950 text-amber-300 p-4">
        <p>
          <span class="font-semibold">
            {{ formatAmount(commissionAvailable.quantity) }}
            {{ formatAmount(commissionAvailable.amount) }}
          </span>
        </p>
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from '../Card.vue'
import { formatAmount } from '../../helpers/format-helper.ts'
import type { PropType } from 'vue'
import type { CommissionAvailable } from '../../types/commission-available.ts'

defineProps({
  commissionAvailable: {
    type: Object as PropType<CommissionAvailable>,
    required: true,
  },
})
</script>
