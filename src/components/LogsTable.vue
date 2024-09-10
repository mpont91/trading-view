<template>
  <div
    v-if="hasError === true"
    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
    role="alert"
  >
    Couldn't fetch the logs!
  </div>
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
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          v-model="search"
          type="text"
          id="table-search"
          class="block p-2 ps-10 text-sm border rounded-md w-80 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search for items"
        />
      </div>
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
    <nav
      class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      <span
        class="text-sm font-normal dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"
      >
        Showing
        <span class="font-semibold text-gray-900 dark:text-white">
          {{ (currentPage - 1) * logsPerPage + 1 }} -
          {{ Math.min(currentPage * logsPerPage, filteredLogs.length) }}
        </span>
        of
        <span class="font-semibold text-gray-900 dark:text-white">
          {{ filteredLogs.length }}
        </span>
      </span>
      <ul class="inline-flex -space-x-px rtl:space-x-reverse h-8">
        <li>
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight border rounded-s-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        <li>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="flex items-center justify-center px-3 h-8 leading-tight border rounded-e-md dark:bg-neutral-800 dark:border-neutral-700 dark:text-gray-400 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Log } from '../types'
import { getLogs } from '../api'
import { formatDate } from '../utils.ts'

const hasError = ref<null | boolean>(null)
const logs = ref<Log[]>([])
const currentPage = ref(1)
const logsPerPage = ref(50)
const types = ref(['error', 'info'])
const search = ref('')

onMounted(async () => {
  try {
    logs.value = await getLogs()
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
})

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
