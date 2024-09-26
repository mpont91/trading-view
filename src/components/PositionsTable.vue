<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the positions!"
  />
  <div v-else-if="hasError === false" class="relative overflow-x-auto">
    <TableNavigation
      :current-page="currentPage"
      :pages="totalPages"
      :items-per-page="positionsPerPage"
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
      class="mb-4"
    />
    <PositionsDataTable
      :positions="positions"
      :markets="markets"
      :can-sort="true"
      :fields="fields"
      :sort-field="sortField"
      :sort-order="sortOrder"
      @sort="sort"
    />
    <TableNavigation
      :current-page="currentPage"
      :pages="totalPages"
      :items-per-page="positionsPerPage"
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMarkets, getPositions } from '../api'
import RefreshButton from './RefreshButton.vue'
import ErrorMessage from './ErrorMessage.vue'
import TableNavigation from './TableNavigation.vue'
import PositionsDataTable from './PositionsDataTable.vue'
import type { Market, Position } from '../types'

const hasError = ref<null | boolean>(null)
const positions = ref<Position[]>([])
const markets = ref<Market[]>([])
const currentPage = ref<number>(1)
const positionsPerPage = ref<number>(50)
const totalPages = ref<number>(0)
const totalItems = ref<number>(0)
const sortField = ref<string>('id')
const sortOrder = ref<'asc' | 'desc'>('desc')

const fields: string[] = [
  'id',
  'pair',
  'quantity',
  'amount',
  'buy_price',
  'buy_at',
  'stop_profit_loss',
  'trailing',
  'sell_price',
  'sell_at',
  'pnl',
]

onMounted(async () => {
  await refresh()
})

async function refresh() {
  positions.value = []
  markets.value = []
  totalPages.value = 0
  totalItems.value = 0

  try {
    const [fetchedPositions, fetchedMarkets] = await Promise.all([
      getPositions({
        page: currentPage.value,
        limit: positionsPerPage.value,
        sortField: sortField.value,
        sortOrder: sortOrder.value,
      }),
      getMarkets(),
    ])

    positions.value = fetchedPositions.data
    totalPages.value = fetchedPositions.pagination.totalPages
    totalItems.value = fetchedPositions.pagination.totalItems
    markets.value = fetchedMarkets
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
}

async function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    await refresh()
  }
}

async function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    await refresh()
  }
}

async function sort(field: string) {
  if (sortField.value === field) {
    toggleSortOrder()
  } else {
    sortOrder.value = 'desc'
  }

  sortField.value = field
  currentPage.value = 1
  await refresh()
}

function toggleSortOrder() {
  if (sortOrder.value === 'asc') {
    sortOrder.value = 'desc'
  } else {
    sortOrder.value = 'asc'
  }
}
</script>
