<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the indicators!"
  />
  <div v-else-if="hasError === false" class="relative overflow-x-auto">
    <SelectorField
      name="indicators"
      v-model="filterName"
      :items="names"
      @change="onChangeName"
      class="mt-4"
    />
    <SelectorField
      name="pairs"
      v-model="filterPair"
      :items="pairs"
      @change="onChangePair"
      class="mt-4"
    />
    <TableNavigation
      :current-page="currentPage"
      :pages="totalPages"
      :items-per-page="indicatorsPerPage"
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
      class="mb-4"
    />
    <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
      <thead class="text-xs uppercase dark:bg-neutral-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Pair</th>
          <th scope="col" class="px-6 py-3">Price</th>
          <th scope="col" class="px-6 py-3">Signal</th>
          <th scope="col" class="px-6 py-3">Created at</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="indicator in indicators"
          class="border-b dark:border-gray-700"
        >
          <td class="px-6 py-4 dark:text-white">{{ indicator.name }}</td>
          <td class="px-6 py-4 dark:text-white">{{ indicator.pair }}</td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatAmount(indicator.current_price) }}
          </td>
          <td class="px-6 py-4 dark:text-white">{{ indicator.signal }}</td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatDate(indicator.created_at) }}
          </td>
        </tr>
      </tbody>
    </table>
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
import { getMarkets, getIndicators } from '../api.ts'
import TableNavigation from './TableNavigation.vue'
import RefreshButton from './RefreshButton.vue'
import ErrorMessage from './ErrorMessage.vue'
import type { Indicator, Market } from '../types'
import SelectorField from './SelectorField.vue'

const hasError = ref<null | boolean>(null)
const markets = ref<Market[]>([])
const indicators = ref<Indicator[]>([])
const names = ref<string[]>(['SMA', 'EMA', 'MACD', 'RSI'])
const pairs = ref<string[]>([])
const indicatorsPerPage = ref<number>(50)
const filterName = ref<string>('')
const filterPair = ref<string>('')
const currentPage = ref<number>(1)
const totalPages = ref<number>(0)
const totalItems = ref<number>(0)

onMounted(async () => {
  filterName.value = names.value[0]
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
        name: filterName.value,
        pair: filterPair.value,
      },
    })

    indicators.value = fetchedIndicators.data
    totalPages.value = fetchedIndicators.pagination.totalPages
    totalItems.value = fetchedIndicators.pagination.totalItems
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
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
