<template>
  <RefreshButton @click="refresh" />
  <ErrorMessage v-if="hasError === true" message="Couldn't fetch the logs!" />
  <div v-else-if="hasError === false">
    <div
      class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4"
    >
      <CheckboxField
        v-model="types"
        :items="['error', 'info', 'debug']"
        @change="onChangeLevel"
      />
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
    <div class="relative overflow-x-auto shadow-md">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs">
            <td class="md:text-nowrap">{{ formatDate(log.timestamp) }}</td>
            <td class="md:text-nowrap">{{ log.level }}</td>
            <td class="message-column">{{ log.message }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
import CheckboxField from './CheckboxField.vue'

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
