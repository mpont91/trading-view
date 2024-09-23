<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the predictions!"
  />
  <div v-else-if="hasError === false" class="relative overflow-x-auto">
    <div class="flex">
      <div v-for="pair in pairs" :key="pair" class="flex items-center me-4">
        <input
          :id="pair"
          type="radio"
          :value="pair"
          v-model="filterPair"
          @change="onChangePair"
          name="inline-radio-group"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          :for="pair"
          class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >{{ pair }}</label
        >
      </div>
    </div>
    <TableNavigation
      :current-page="currentPage"
      :pages="totalPages"
      :items-per-page="predictionsPerPage"
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
      class="mb-4"
    />
    <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
      <thead class="text-xs uppercase dark:bg-neutral-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Pair</th>
          <th scope="col" class="px-6 py-3">Price</th>
          <th scope="col" class="px-6 py-3">Signal</th>
          <th scope="col" class="px-6 py-3">Created at</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="prediction in predictions"
          class="border-b dark:border-gray-700"
        >
          <td class="px-6 py-4 dark:text-white">{{ prediction.pair }}</td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatAmount(prediction.current_price) }}
          </td>
          <td class="px-6 py-4 dark:text-white">{{ prediction.signal }}</td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatDate(prediction.created_at) }}
          </td>
        </tr>
      </tbody>
    </table>
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
  markets.value = await getMarkets()
  if (markets.value.length > 0) {
    pairs.value = markets.value.map((m: Market) => m.pair)
  }
  filterPair.value = pairs.value[0]
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
