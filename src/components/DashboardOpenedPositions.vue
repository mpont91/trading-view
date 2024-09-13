<template>
  <div class="bg-neutral-800 rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">Opened positions</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
        <thead class="text-xs uppercase dark:bg-neutral-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Pair</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3">Amount</th>
            <th scope="col" class="px-6 py-3">Buy price</th>
            <th scope="col" class="px-6 py-3">Buy at</th>
            <th scope="col" class="px-6 py-3">Stop profit</th>
            <th scope="col" class="px-6 py-3">Stop loss</th>
            <th scope="col" class="px-6 py-3">Sell price</th>
            <th scope="col" class="px-6 py-3">Sell at</th>
            <th colspan="2" scope="col" class="px-6 py-3">PnL</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="position in positions"
            class="border-b dark:border-gray-700"
          >
            <td class="px-6 py-4 dark:text-white">{{ position.pair }}</td>
            <td class="px-6 py-4 dark:text-white">{{ position.quantity }}</td>
            <td class="px-6 py-4 dark:text-white">
              {{ formatAmount(position.amount) }}
            </td>
            <td class="px-6 py-4 dark:text-white">
              {{ formatAmount(position.buy_price) }}
            </td>
            <td class="px-6 py-4 dark:text-white">
              {{ formatDate(position.buy_at) }}
            </td>
            <td class="px-6 py-4 dark:text-white">
              {{ formatAmount(position.stop_profit) }}
            </td>
            <td class="px-6 py-4 dark:text-white">
              {{ formatAmount(position.stop_loss) }}
            </td>
            <td class="px-6 py-4 dark:text-white">
              {{ formatAmount(position.sell_price) }}
            </td>
            <td class="px-6 py-4 dark:text-white">
              {{ formatDate(position.sell_at) }}
            </td>
            <td class="px-6 py-4 dark:text-white">
              {{ formatAmount(position.pnl) }}
            </td>
            <td class="px-6 py-4 dark:text-white">
              {{ formatPercentage(position.pnl_percentage) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatAmount, formatDate, formatPercentage } from '../utils.ts'
import type { Position } from '../types.ts'

defineProps({
  positions: {
    type: Array<Position>,
    default: [],
  },
})
</script>
