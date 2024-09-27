<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the predictions!"
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
      :items-per-page="predictionsPerPage"
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
      class="mb-4"
    />
    <div class="relative overflow-x-auto shadow-md">
      <table>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Price</th>
            <th>Signal</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prediction in predictions">
            <td>{{ prediction.pair }}</td>
            <td>{{ formatAmount(prediction.current_price) }}</td>
            <td>{{ prediction.signal }}</td>
            <td>{{ formatDate(prediction.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <TableNavigation
      :current-page="currentPage"
      :pages="totalPages"
      :items-per-page="predictionsPerPage"
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { formatAmount, formatDate } from '../utils.ts'
import { getMarkets, getPredictions } from '../api.ts'
import TableNavigation from './TableNavigation.vue'
import RefreshButton from './RefreshButton.vue'
import ErrorMessage from './ErrorMessage.vue'
import type { Prediction, Market } from '../types'
import SelectorField from './SelectorField.vue'

const hasError = ref<null | boolean>(null)
const markets = ref<Market[]>([])
const predictions = ref<Prediction[]>([])
const pairs = ref<string[]>([])
const predictionsPerPage = ref<number>(50)
const filterPair = ref<string>('')
const currentPage = ref<number>(1)
const totalPages = ref<number>(0)
const totalItems = ref<number>(0)

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
  predictions.value = []
  totalPages.value = 0
  totalItems.value = 0

  try {
    const fetchedPredictions = await getPredictions({
      page: currentPage.value,
      limit: predictionsPerPage.value,
      sortField: 'created_at',
      sortOrder: 'desc',
      filters: {
        pair: filterPair.value,
      },
    })

    predictions.value = fetchedPredictions.data
    totalPages.value = fetchedPredictions.pagination.totalPages
    totalItems.value = fetchedPredictions.pagination.totalItems
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
}

async function onChangePair() {
  currentPage.value = 1
  await refresh()
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
