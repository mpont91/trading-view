<template>
  <Card title="Latest trades">
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-neutral-400">
        <thead class="text-xs uppercase bg-neutral-700 text-neutral-400">
          <tr>
            <th scope="col" class="px-6 py-3">Symbol</th>
            <th scope="col" class="px-6 py-3">Side</th>
            <th scope="col" class="px-6 py-3">Entry date</th>
            <th scope="col" class="px-6 py-3">Entry price</th>
            <th scope="col" class="px-6 py-3">Exit date</th>
            <th scope="col" class="px-6 py-3">Exit price</th>
            <th scope="col" class="px-6 py-3">Profit</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="trade in trades"
            class="border-b bg-neutral-800 border-neutral-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium whitespace-nowrap text-white"
            >
              {{ trade.symbol }}
            </th>
            <td class="px-6 py-4">{{ trade.side }}</td>
            <td class="px-6 py-4">{{ formatDate(trade.entryAt) }}</td>
            <td class="px-6 py-4">{{ formatNumber(trade.entryPrice) }}</td>
            <td class="px-6 py-4">{{ formatDate(trade.exitAt) }}</td>
            <td class="px-6 py-4">{{ formatNumber(trade.exitPrice) }}</td>
            <td class="px-6 py-4">{{ formatAmount(trade.pnl) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from '../common/Card.vue'
import type { PropType } from 'vue'
import type { Trade } from '../../types/trade.ts'
import {
  formatAmount,
  formatNumber,
  formatDate,
} from '../../helpers/format-helper.ts'

defineProps({
  trades: {
    type: Array as PropType<Trade[]>,
    required: true,
  },
})
</script>
