<template>
  <ErrorMessage v-if="hasError" message="Couldn't fetch the positions!" />

  <SelectorMultiple
    v-model="selectedPairs"
    :items="availablePairs"
    @change="onChangePair"
    name="pairs"
  />
  <div v-if="!hasError && !isLoading">
    <TableNavigation
      :current-page="currentPage"
      :pages="totalPages"
      :items-per-page="positionsPerPage"
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
      class="mb-4"
    />
    <PositionsClosedDataTable
      :positions="positions"
      :pairs="pairs"
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
import { getPairs, getPositions } from '../../api.ts'
import ErrorMessage from '../shared/ErrorMessage.vue'
import TableNavigation from '../shared/TableNavigation.vue'
import PositionsClosedDataTable from './PositionsClosedDataTable.vue'
import type { Pair } from '../../models/pair.ts'
import type { Position } from '../../models/position.ts'
import SelectorMultiple from '../shared/SelectorMultiple.vue'

const hasError = ref<boolean>(false)
const positions = ref<Position[]>([])
const currentPage = ref<number>(1)
const positionsPerPage = ref<number>(50)
const totalPages = ref<number>(0)
const totalItems = ref<number>(0)
const sortField = ref<string>('id')
const sortOrder = ref<'asc' | 'desc'>('desc')
const isLoading = ref<boolean>(true)
const pairs = ref<Pair[]>([])
const availablePairs = ref<string[]>([])
const selectedPairs = ref<string[]>([])

onMounted(async () => {
  try {
    availablePairs.value = (await getPairs()).map((p: Pair) => p.name)
    selectedPairs.value = availablePairs.value
  } catch (error: unknown) {
    hasError.value = true
  }
  await refresh()
})

async function refresh() {
  isLoading.value = true
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
        is_closed: '1',
        pair: selectedPairs.value.join(','),
      },
    })

    positions.value = fetchedPositions.data
    totalPages.value = fetchedPositions.pagination.totalPages
    totalItems.value = fetchedPositions.pagination.totalItems
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
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
