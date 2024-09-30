<template>
  <div class="bg-neutral-800 shadow p-6 mb-6">
    <h2>Balance</h2>
    <div class="relative overflow-x-auto shadow-md">
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="balance in balances">
            <td>{{ balance.currency }}</td>
            <td>{{ formatNumber(balance.quantity) }}</td>
            <td>
              {{
                formatAmount(
                  calculateAmount(balance.currency, balance.quantity),
                )
              }}
            </td>
            <td>{{ formatDate(balance.updated_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { formatAmount, formatDate, formatNumber } from '../../utils.ts'
import type { Market } from '../../models/market.ts'
import type { Balance } from '../../models/balance.ts'

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
