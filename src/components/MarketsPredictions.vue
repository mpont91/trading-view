<template>
  <ErrorMessage
    v-if="hasError === true"
    message="Couldn't fetch the predictions!"
  />
  <div v-else-if="hasError === false" class="relative overflow-x-auto">
    <header>
      <h1
        class="mt-8 mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white"
      >
        Predictions
      </h1>
    </header>
    <div class="flex">
      <div v-for="pair in pairs" :key="pair" class="flex items-center me-4">
        <input
          :id="pair"
          type="radio"
          :value="pair"
          v-model="filterPair"
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
      :length="filteredPredictions.length"
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
          v-for="prediction in paginatedPredictions"
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
      :length="filteredPredictions.length"
      @next-page="nextPage"
      @prev-page="prevPage"
    />
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Prediction } from '../types'
import ErrorMessage from './ErrorMessage.vue'
import { formatAmount, formatDate } from '../utils.ts'
import TableNavigation from './TableNavigation.vue'
import { computed, onMounted, ref, watch } from 'vue'

const currentPage = ref(1)
const predictionsPerPage = ref(50)
const filterPair = ref('')

const props = defineProps({
  predictions: {
    type: Array as PropType<Prediction[]>,
    default: () => [],
  },
  pairs: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  hasError: {
    type: Boolean,
    default: null,
  },
})

onMounted(() => {
  if (props.pairs.length > 0) {
    filterPair.value = props.pairs[0]
  }
})

const filteredPredictions = computed(() => {
  return props.predictions.filter(
    (prediction) => prediction.pair === filterPair.value,
  )
})

const paginatedPredictions = computed(() => {
  const start = (currentPage.value - 1) * predictionsPerPage.value
  const end = start + predictionsPerPage.value
  return filteredPredictions.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredPredictions.value.length / predictionsPerPage.value)
})

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

watch(
  () => props.pairs,
  (newPairs) => {
    if (newPairs.length > 0) {
      filterPair.value = newPairs[0]
    }
  },
  { immediate: true },
)
</script>
<style scoped></style>
