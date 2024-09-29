<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the indicators!"
  />
  <div v-else-if="hasError === false">
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
import { getMarkets, getIndicators } from '../api.ts'
import TableNavigation from './shared/TableNavigation.vue'
import RefreshButton from './shared/RefreshButton.vue'
import ErrorMessage from './shared/ErrorMessage.vue'
import type { Indicator } from '../models/indicator.ts'
import type { Market } from '../models/market.ts'
import SelectorField from './shared/SelectorField.vue'

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
