<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the positions!"
  />
  <div v-else-if="hasError === false">
    <SelectorField
      v-model="filterPair"
      name="pairs"
      :items="pairs"
      @change="onChangePair"
    />
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
import SelectorField from './SelectorField.vue'

const hasError = ref<null | boolean>(null)
const positions = ref<Position[]>([])
const markets = ref<Market[]>([])
const currentPage = ref<number>(1)
const positionsPerPage = ref<number>(50)
const totalPages = ref<number>(0)
const totalItems = ref<number>(0)
const sortField = ref<string>('id')
const sortOrder = ref<'asc' | 'desc'>('desc')
const pairs = ref<string[]>([])
const filterPair = ref<string>('')

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
  try {
    markets.value = await getMarkets()
    if (markets.value.length > 0) {
      pairs.value = markets.value.map((m: Market) => m.pair)
    }
    filterPair.value = pairs.value[0]
  } catch (error: unknown) {
    hasError.value = true
  }

  await refresh()
})

async function refresh() {
  positions.value = []
  totalPages.value = 0
  totalItems.value = 0

  try {
    const fetchedPositions = await getPositions({
      page: currentPage.value,
      limit: positionsPerPage.value,
      sortField: sortField.value,
      sortOrder: sortOrder.value,
      filters: {
        pair: filterPair.value,
      },
    })

    positions.value = fetchedPositions.data
    totalPages.value = fetchedPositions.pagination.totalPages
    totalItems.value = fetchedPositions.pagination.totalItems
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
async function onChangePair() {
  currentPage.value = 1
  await refresh()
}
</script>
