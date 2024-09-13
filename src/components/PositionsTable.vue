<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the positions!"
  />
  <div v-else-if="hasError === false" class="relative overflow-x-auto">
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
        <tr v-for="position in positions" class="border-b dark:border-gray-700">
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
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Position } from '../types'
import { getPositions } from '../api'
import { formatDate, formatAmount, formatPercentage } from '../utils.ts'
import RefreshButton from './RefreshButton.vue'
import ErrorMessage from './ErrorMessage.vue'

const hasError = ref<null | boolean>(null)
const positions = ref<Position[]>([])

onMounted(async () => {
  await refresh()
})

async function refresh() {
  positions.value = []
  try {
    positions.value = await getPositions()
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
}
</script>
<style scoped></style>
