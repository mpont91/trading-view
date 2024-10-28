<template>
  <ErrorMessage v-if="hasError" message="Couldn't fetch the logs!" />
  <div
    class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-between pb-4 sm:space-x-4"
  >
    <SelectorMultiple
      v-model="types"
      :items="items"
      @change="onChangeLevel"
      name="logs"
    />
    <SearchField @change="onSearch" v-model="search" />
  </div>

  <Loading v-if="isLoading" />
  <div v-if="!hasError && !isLoading">
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
import ErrorMessage from './shared/ErrorMessage.vue'
import TableNavigation from './shared/TableNavigation.vue'
import SearchField from './shared/SearchField.vue'
import type { Log } from '../models/log.ts'
import SelectorMultiple from './shared/SelectorMultiple.vue'
import Loading from './shared/Loading.vue'

const hasError = ref<boolean>(false)
const logs = ref<Log[]>([])
const currentPage = ref<number>(1)
const logsPerPage = ref<number>(50)
const totalPages = ref<number>(0)
const totalItems = ref<number>(0)
const types = ref<string[]>(['error', 'info', 'debug'])
const search = ref<string>('')
const isLoading = ref<boolean>(true)

const items = ['error', 'info', 'debug']

onMounted(async () => {
  await refresh()
})

async function refresh() {
  isLoading.value = true
  logs.value = []
  totalPages.value = 0
  totalItems.value = 0
  try {
    const fetchedLogs = await getLogs({
      page: currentPage.value,
      limit: logsPerPage.value,
      filters: {
        message: search.value,
        ...items.reduce(
          (acc, item) => {
            acc[item] = types.value.includes(item).toString()
            return acc
          },
          {} as Record<string, string>,
        ),
      },
    })
    logs.value = fetchedLogs.data
    totalPages.value = fetchedLogs.pagination.totalPages
    totalItems.value = fetchedLogs.pagination.totalItems
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
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
