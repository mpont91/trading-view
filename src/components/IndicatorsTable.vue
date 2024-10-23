<template>
  <ErrorMessage v-if="hasError" message="Couldn't fetch the indicators!" />
  <SelectorMultiple
    v-model="selectedNames"
    :items="names"
    @change="onChangeName"
  />
  <SelectorMultiple
    v-model="selectedPairs"
    :items="pairs"
    @change="onChangePair"
  />
  <div v-if="!hasError && !isLoading">
    <TableNavigation
      :current-page="currentPage"
      :pages="totalPages"
      :items-per-page="indicatorsPerPage"
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
      class="mb-4"
    />
    <div class="relative overflow-x-auto shadow-md">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Pair</th>
            <th>Price</th>
            <th>Signal</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="indicator in indicators">
            <td>{{ indicator.name }}</td>
            <td>{{ indicator.pair }}</td>
            <td>{{ formatAmount(indicator.current_price) }}</td>
            <td>{{ indicator.signal }}</td>
            <td>{{ formatDate(indicator.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <TableNavigation
      :current-page="currentPage"
      :pages="totalPages"
      :items-per-page="indicatorsPerPage"
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { formatAmount, formatDate } from '../utils.ts'
import { getIndicators, getPairs } from '../api.ts'
import TableNavigation from './shared/TableNavigation.vue'
import ErrorMessage from './shared/ErrorMessage.vue'
import type { Indicator } from '../models/indicator.ts'
import SelectorMultiple from './shared/SelectorMultiple.vue'

const hasError = ref<boolean>(false)
const indicators = ref<Indicator[]>([])
const names = ref<string[]>(['SMA', 'EMA', 'MACD', 'RSI'])
const pairs = ref<string[]>([])
const indicatorsPerPage = ref<number>(50)
const selectedNames = ref<string[]>([])
const selectedPairs = ref<string[]>([])
const currentPage = ref<number>(1)
const totalPages = ref<number>(0)
const totalItems = ref<number>(0)
const isLoading = ref<boolean>(true)

onMounted(async () => {
  selectedNames.value = names.value
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
  indicators.value = []
  totalPages.value = 0
  totalItems.value = 0

  try {
    const fetchedIndicators = await getIndicators({
      page: currentPage.value,
      limit: indicatorsPerPage.value,
      sortField: 'created_at',
      sortOrder: 'desc',
      filters: {
        name: selectedNames.value.join(','),
        pair: selectedPairs.value.join(','),
      },
    })

    indicators.value = fetchedIndicators.data
    totalPages.value = fetchedIndicators.pagination.totalPages
    totalItems.value = fetchedIndicators.pagination.totalItems
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

async function onChangeName() {
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
