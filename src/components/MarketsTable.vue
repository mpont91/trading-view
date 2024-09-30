<template>
  <RefreshButton :disabled="isLoading" @click="refresh" />
  <ErrorMessage v-if="hasError" message="Couldn't fetch the markets!" />
  <div
    v-if="!hasError && !isLoading"
    class="relative overflow-x-auto shadow-md"
  >
    <table>
      <thead>
        <tr>
          <th>Pair</th>
          <th>Price</th>
          <th>Signal</th>
          <th>Updated at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="market in markets">
          <td>{{ market.pair }}</td>
          <td>{{ formatAmount(market.price) }}</td>
          <td>{{ market.signal }}</td>
          <td>{{ formatDate(market.updated_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMarkets } from '../api.ts'
import { formatAmount, formatDate } from '../utils.ts'
import RefreshButton from './shared/RefreshButton.vue'
import ErrorMessage from './shared/ErrorMessage.vue'
import type { Market } from '../models/market.ts'

const hasError = ref<boolean>(false)
const markets = ref<Market[]>([])
const isLoading = ref<boolean>(true)

onMounted(async () => {
  await refresh()
})

async function refresh() {
  isLoading.value = true
  markets.value = []
  try {
    markets.value = await getMarkets()
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>
