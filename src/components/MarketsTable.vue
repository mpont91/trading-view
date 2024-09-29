<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the markets!"
  />
  <div
    v-else-if="hasError === false"
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
import RefreshButton from './RefreshButton.vue'
import ErrorMessage from './ErrorMessage.vue'
import type { Market } from '../models/market.ts'

const hasError = ref<null | boolean>(null)
const markets = ref<Market[]>([])

onMounted(async () => {
  await refresh()
})

async function refresh() {
  markets.value = []
  try {
    markets.value = await getMarkets()
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
}
</script>
