<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the positions!"
  />
  <div v-else-if="hasError === false" class="relative overflow-x-auto">
          <SearchField v-model="search" />
      <TableNavigation
          :current-page="currentPage"
          :pages="totalPages"
          :items-per-page="positionsPerPage"
          :length="filteredPositions.length"
          @next-page="nextPage"
          @prev-page="prevPage"
          class="mb-4"
      />
    <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
      <thead class="text-xs uppercase dark:bg-neutral-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Pair</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
          <th scope="col" class="px-6 py-3">Amount ($)</th>
          <th scope="col" class="px-6 py-3">Buy price ($)</th>
          <th scope="col" class="px-6 py-3">Buy at</th>
          <th scope="col" class="px-6 py-3">Stop profit ($)</th>
          <th scope="col" class="px-6 py-3">Stop loss ($)</th>
          <th scope="col" class="px-6 py-3">Sell price ($)</th>
          <th scope="col" class="px-6 py-3">Sell at</th>
          <th colspan="2" scope="col" class="px-6 py-3">PnL</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="position in paginatedPositions"
          :class="{
            'bg-green-950': position.is_closed && position.pnl >= 0,
            'bg-red-950': position.is_closed && position.pnl < 0,
            'bg-green-900': !position.is_closed && pnlLive(position) >= 0,
            'bg-red-900': !position.is_closed && pnlLive(position) < 0,
          }"
          class="border-b dark:border-gray-700"
        >
          <td class="px-6 py-4 dark:text-white">{{ position.pair }}</td>
          <td class="px-6 py-4 dark:text-white">{{ position.quantity }}</td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatNumber(position.amount) }}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatNumber(position.buy_price) }}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatDate(position.buy_at) }}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatNumber(position.stop_profit) }}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatNumber(position.stop_loss) }}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatNumber(position.sell_price) }}
          </td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatDate(position.sell_at) }}
          </td>
          <td class="px-6 py-4 dark:text-white text-nowrap">
            {{ formatAmount(position.is_closed ? position.pnl : pnlLive(position)) }}
          </td>
          <td class="px-6 py-4 dark:text-white text-nowrap">
            {{ formatPercentage(position.is_closed ? position.pnl_percentage : pnlPercentageLive(position)) }}
          </td>
        </tr>
      </tbody>
    </table>
      <TableNavigation
          :current-page="currentPage"
          :pages="totalPages"
          :items-per-page="lpositionsPerPage"
          :length="filteredPositions.length"
          @next-page="nextPage"
          @prev-page="prevPage"
      />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { Position } from '../types'
import { getMarkets, getPositions } from '../api'
import {
  formatDate,
  formatAmount,
  formatPercentage,
  formatNumber,
} from '../utils.ts'
import RefreshButton from './RefreshButton.vue'
import ErrorMessage from './ErrorMessage.vue'
import TableNavigation from "./TableNavigation.vue";
import SearchField from "./SearchField.vue";
const hasError = ref<null | boolean>(null)
const positions = ref<Position[]>([])
const markets = ref<Market[]>([])
const currentPage = ref(1)
const positionsPerPage = ref(50)
const search = ref('')

onMounted(async () => {
  await refresh()
})

async function refresh() {
  positions.value = []
    markets.value = []
  try {
      const [fetchedPositions, fetchedMarkets] = await Promise.all([
          getPositions(),
          getMarkets(),
      ])

      positions.value = fetchedPositions
      markets.value = fetchedMarkets
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
}

function getMarket(pair: string){
    return markets.value.filter(market => market.pair === pair)[0]
}

function pnlLive(position: Position): number{
    const market = getMarket(position.pair)
    return (market.price - position.buy_price) * position.quantity;
}

function pnlPercentageLive(position: Position){
    const market = getMarket(position.pair)
    return ((market.price - position.buy_price) / position.buy_price) * 100;
}

const filteredPositions = computed(() => {
    return positions.value.filter(
        (position) =>
            position.pair.toLowerCase().includes(search.value.toLowerCase()),
    )
})

const paginatedPositions = computed(() => {
    const start = (currentPage.value - 1) * positionsPerPage.value
    const end = start + positionsPerPage.value
    return filteredPositions.value.slice(start, end)
})

const totalPages = computed(() => {
    return Math.ceil(filteredPositions.value.length / positionsPerPage.value)
})

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

function resetPagination() {
    currentPage.value = 1
}

watch(search, resetPagination)
</script>
<style scoped></style>
