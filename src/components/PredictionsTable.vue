<template>
  <ErrorMessage v-if="hasError" message="Couldn't fetch the predictions!" />

  <SelectorMultiple
    v-model="selectedPairs"
    :items="pairs"
    @change="onChangePair"
    name="pairs"
  />
  <div v-if="!hasError && !isLoading">
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
import { formatAmount, formatDate } from '../helpers/format-helper.ts'
import { getPairs, getPredictions } from '../api.ts'
import TableNavigation from './shared/TableNavigation.vue'
import ErrorMessage from './shared/ErrorMessage.vue'
import type { Prediction } from '../models/prediction.ts'
import SelectorMultiple from './shared/SelectorMultiple.vue'
import type { Pair } from '../models/pair.ts'

const hasError = ref<boolean>(false)
const predictions = ref<Prediction[]>([])
const pairs = ref<string[]>([])
const predictionsPerPage = ref<number>(50)
const selectedPairs = ref<string[]>([])
const currentPage = ref<number>(1)
const totalPages = ref<number>(0)
const totalItems = ref<number>(0)
const isLoading = ref<boolean>(true)

onMounted(async () => {
  try {
    pairs.value = (await getPairs()).map((p: Pair) => p.name)
    selectedPairs.value = pairs.value
  } catch (error: unknown) {
    hasError.value = true
  }

  await refresh()
})

async function refresh() {
  isLoading.value = true
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
        pair: selectedPairs.value.join(','),
      },
    })

    predictions.value = fetchedPredictions.data
    totalPages.value = fetchedPredictions.pagination.totalPages
    totalItems.value = fetchedPredictions.pagination.totalItems
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
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
