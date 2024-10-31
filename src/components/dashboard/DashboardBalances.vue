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
import {
  formatAmount,
  formatDate,
  formatNumber,
} from '../../helpers/format-helper.ts'
import type { Pair } from '../../models/pair.ts'
import type { Balance } from '../../models/balance.ts'

const props = defineProps({
  balances: {
    type: Array as PropType<Balance[]>,
    default: () => [],
  },
  pairs: {
    type: Array as PropType<Pair[]>,
    default: () => [],
  },
})

function calculateAmount(currency: string, quantity: number): number {
  if (currency === 'USDC') return quantity

  const pair = props.pairs.find((pair) => pair.name === `${currency}USDC`)

  if (!pair) {
    return 0
  }

  return quantity * pair.price
}
</script>
