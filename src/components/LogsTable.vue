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
            @change="onChangeLevel"
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
      <SearchField @change="onSearch" v-model="search" />
    </div>
    <TableNavigation
      :current-page="currentPage"
      :pages="totalPages"
      :items-per-page="logsPerPage"
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
      class="mb-4"
    />
    <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
      <thead class="text-xs uppercase dark:bg-neutral-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Date</th>
          <th scope="col" class="px-6 py-3">Type</th>
          <th scope="col" class="px-6 py-3">Message</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" class="border-b dark:border-gray-700">
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
      :length="totalItems"
      @next-page="nextPage"
      @prev-page="prevPage"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getLogs } from '../api'
import { formatDate } from '../utils.ts'
import RefreshButton from './RefreshButton.vue'
import ErrorMessage from './ErrorMessage.vue'
import TableNavigation from './TableNavigation.vue'
import SearchField from './SearchField.vue'
import type { Log } from '../types'

const hasError = ref<null | boolean>(null)
const logs = ref<Log[]>([])
const currentPage = ref<number>(1)
const logsPerPage = ref<number>(50)
const totalPages = ref<number>(0)
const totalItems = ref<number>(0)
const types = ref<string[]>(['error', 'info'])
const search = ref<string>('')

onMounted(async () => {
  await refresh()
})

async function refresh() {
  logs.value = []
  totalPages.value = 0
  totalItems.value = 0
  try {
    const fetchedLogs = await getLogs({
      page: currentPage.value,
      limit: logsPerPage.value,
      filters: {
        message: search.value,
        error: types.value.includes('error'),
        info: types.value.includes('info'),
        debug: types.value.includes('debug'),
      },
    })
    logs.value = fetchedLogs.data
    totalPages.value = fetchedLogs.pagination.totalPages
    totalItems.value = fetchedLogs.pagination.totalItems
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
}

async function onSearch() {
  currentPage.value = 1
  await refresh()
}

async function onChangeLevel() {
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
<style scoped>
.message-column {
  word-break: break-word;
  overflow-wrap: break-word;
}
</style>
