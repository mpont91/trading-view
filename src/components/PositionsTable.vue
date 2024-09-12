<template>
  <button
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    @click="refresh"
  >
    Refresh
  </button>
  <div
    v-if="hasError === true"
    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
    role="alert"
  >
    Couldn't fetch the positions!
  </div>
  <div v-else-if="hasError === false" class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
      <thead class="text-xs uppercase dark:bg-neutral-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Pair</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
          <th scope="col" class="px-6 py-3">Amount</th>
          <th scope="col" class="px-6 py-3">Buy price</th>
          <th scope="col" class="px-6 py-3">Buy datetime</th>
          <th scope="col" class="px-6 py-3">Sell price</th>
          <th scope="col" class="px-6 py-3">Sell datetime</th>
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
