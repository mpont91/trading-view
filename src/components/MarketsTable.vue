<template>
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the markets!"
  />
  <div v-else-if="hasError === false" class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
      <thead class="text-xs uppercase dark:bg-neutral-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Pair</th>
          <th scope="col" class="px-6 py-3">Price</th>
          <th scope="col" class="px-6 py-3">Signal</th>
          <th scope="col" class="px-6 py-3">Updated at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="market in markets" class="border-b dark:border-gray-700">
          <td class="px-6 py-4 dark:text-white">{{ market.pair }}</td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatAmount(market.price) }}
          </td>
          <td class="px-6 py-4 dark:text-white">{{ market.signal }}</td>
          <td class="px-6 py-4 dark:text-white">
            {{ formatDate(market.updated_at) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Market } from '../types'
import ErrorMessage from './ErrorMessage.vue'
import { formatAmount, formatDate } from '../utils.ts'

defineProps({
  markets: {
    type: Array as PropType<Market[]>,
    default: () => [],
  },
  hasError: {
    type: Boolean,
    default: null,
  },
})
</script>
<style scoped></style>
