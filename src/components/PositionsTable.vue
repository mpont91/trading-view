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
    <PositionsDataTable :positions="paginatedPositions" :markets="markets" />
    <TableNavigation
      :current-page="currentPage"
      :pages="totalPages"
      :items-per-page="positionsPerPage"
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

const filteredPositions = computed(() => {
  return positions.value.filter((position) =>
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
