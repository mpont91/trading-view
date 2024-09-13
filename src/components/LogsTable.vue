<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage v-if="hasError === true" message="Couldn't fetch the logs!" />
  <div v-else-if="hasError === false" class="relative overflow-x-auto">
    <div
      class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4"
    >
      <div class="flex">
        <div
          v-for="type in ['error', 'info', 'debug']"
          :key="type"
          class="flex items-center me-4"
        >
          <input
            :id="`checkbox-${type}`"
            type="checkbox"
            :value="type"
            v-model="types"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            :for="`checkbox-${type}`"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize"
          >
            {{ type }}
          </label>
        </div>
      </div>
      <SearchField v-model="search" />
    </div>
    <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
      <thead class="text-xs uppercase dark:bg-neutral-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Date</th>
          <th scope="col" class="px-6 py-3">Type</th>
          <th scope="col" class="px-6 py-3">Message</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in paginatedLogs" class="border-b dark:border-gray-700">
          <td class="px-6 py-4 dark:text-white md:text-nowrap">
            {{ formatDate(log.timestamp) }}
          </td>
          <td class="px-6 py-4 dark:text-white md:text-nowrap">
            {{ log.level }}
          </td>
          <td class="px-6 py-4 dark:text-white message-column">
            {{ log.message }}
          </td>
        </tr>
      </tbody>
    </table>
    <TableNavigation
      :current-page="currentPage"
      :pages="totalPages"
      :items-per-page="logsPerPage"
      :length="filteredLogs.length"
      @next-page="nextPage"
      @prev-page="prevPage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Log } from '../types'
import { getLogs } from '../api'
import { formatDate } from '../utils.ts'
import RefreshButton from './RefreshButton.vue'
import ErrorMessage from './ErrorMessage.vue'
import TableNavigation from './TableNavigation.vue'
import SearchField from './SearchField.vue'

const hasError = ref<null | boolean>(null)
const logs = ref<Log[]>([])
const currentPage = ref(1)
const logsPerPage = ref(50)
const types = ref(['error', 'info'])
const search = ref('')

onMounted(async () => {
  await refresh()
})

async function refresh() {
  logs.value = []
  try {
    logs.value = await getLogs()
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
}

const filteredLogs = computed(() => {
  return logs.value.filter(
    (log) =>
      types.value.includes(log.level) &&
      log.message.toLowerCase().includes(search.value.toLowerCase()),
  )
})

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * logsPerPage.value
  const end = start + logsPerPage.value
  return filteredLogs.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredLogs.value.length / logsPerPage.value)
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

function resetPagination() {
  currentPage.value = 1
}

watch([types, search], resetPagination)
</script>
<style scoped>
.message-column {
  word-break: break-word;
  overflow-wrap: break-word;
}
</style>
