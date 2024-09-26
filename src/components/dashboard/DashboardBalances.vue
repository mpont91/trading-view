<template>
  <div class="bg-neutral-800 rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">Balance</h2>
    <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
      <thead class="text-xs uppercase dark:bg-neutral-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Currency</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
          <th scope="col" class="px-6 py-3">Amount</th>
          <th scope="col" class="px-6 py-3">Updated at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="balance in balances">
          <td class="px-6 py-4 dark:text-white">{{ balance.currency }}</td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatNumber(balance.quantity) }}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {{
              formatAmount(calculateAmount(balance.currency, balance.quantity))
            }}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatDate(balance.updated_at) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { formatAmount, formatDate, formatNumber } from '../../utils.ts'
import type { Balance, Market } from '../../types.ts'

const props = defineProps({
  balances: {
    type: Array as PropType<Balance[]>,
    default: () => [],
  },
  markets: {
    type: Array as PropType<Market[]>,
    default: () => [],
  },
})

function calculateAmount(currency: string, quantity: number) {
  if (currency === 'USDC') return quantity

  const market = props.markets.find(
    (market) => market.pair === `${currency}USDC`,
  )

  if (!market) {
    return null
  }

  return quantity * market.price
}
</script>
