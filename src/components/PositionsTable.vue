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
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
      class="mb-4"
    />
    <PositionsDataTable :positions="positions" :markets="markets" />
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
import { ref, onMounted, computed, watch } from 'vue'
import type { Market, Position } from '../types'
import { getMarkets, getPositions } from '../api'
import RefreshButton from './RefreshButton.vue'
import ErrorMessage from './ErrorMessage.vue'
import TableNavigation from './TableNavigation.vue'
import SearchField from './SearchField.vue'
import PositionsDataTable from './PositionsDataTable.vue'
const hasError = ref<null | boolean>(null)
const positions = ref<Position[]>([])
const markets = ref<Market[]>([])
const currentPage = ref(1)
const positionsPerPage = ref(50)
const totalPages = ref(0)
const totalItems = ref(0)
const search = ref('')

onMounted(async () => {
  await refresh()
})

async function refresh() {
  positions.value = []
  markets.value = []
  try {
    const [fetchedPositions, fetchedMarkets] = await Promise.all([
      getPositions({ page: currentPage.value, limit: positionsPerPage.value }),
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
</script>
<style scoped></style>
