<template>
  <Card title="Positions">
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-neutral-400">
        <thead class="text-xs uppercase bg-neutral-700 text-neutral-400">
          <tr>
            <th scope="col" class="px-6 py-3">Symbol</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Amount</th>
            <th scope="col" class="px-6 py-3">Entry date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="position in positions"
            class="border-b bg-neutral-800 border-neutral-700"
          >
            <td class="px-6 py-4">{{ position.symbol }}</td>
            <td class="px-6 py-4">{{ formatNumber(position.quantity) }}</td>
            <td class="px-6 py-4">{{ formatAmount(position.price) }}</td>
            <td class="px-6 py-4">{{ formatAmount(position.amount) }}</td>
            <td class="px-6 py-4">{{ formatDate(position.entryAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from '../common/Card.vue'
import type { PropType } from 'vue'
import {
  formatAmount,
  formatNumber,
  formatDate,
} from '../../helpers/format-helper.ts'
import type { Position } from '../../types/position.ts'

defineProps({
  positions: {
    type: Array as PropType<Position[]>,
    required: true,
  },
})
</script>
