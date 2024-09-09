<template>
  <div
    v-if="hasError === true"
    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
    role="alert"
  >
    Couldn't fetch the logs!
  </div>
  <div v-else-if="hasError === false" class="relative overflow-x-auto">
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
          <td class="px-6 py-4 dark:text-white text-nowrap">
            {{ formatDate(log.timestamp) }}
          </td>
          <td class="px-6 py-4 dark:text-white text-nowrap">{{ log.level }}</td>
          <td class="px-6 py-4 dark:text-white message-column">
            {{ log.message }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Log } from '../types'
import { getLogs } from '../api'

const hasError = ref<null | boolean>(null)
const logs = ref<Log[]>([])

onMounted(async () => {
  try {
    logs.value = await getLogs()
    hasError.value = false
  } catch (error: unknown) {
    hasError.value = true
  }
})

function formatDate(date?: string) {
  if (!date) return ''

  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
</script>
<style scoped>
.message-column {
  word-break: break-word;
  overflow-wrap: break-word;
}
</style>
