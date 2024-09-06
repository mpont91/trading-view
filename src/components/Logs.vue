<template>
  <ol class="relative border-s dark:border-gray-700">
    <li v-for="log in logs" :key="log.timestamp" class="mb-10 ms-4">
      <div
        class="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-white"
        :class="{
          'dark:border-red-900 dark:bg-red-700': log.level === 'error',
          'dark:border-blue-900 dark:bg-blue-700': log.level === 'info',
        }"
      ></div>
      <time class="mb-1 text-sm font-normal leading-none dark:text-gray-400">
        {{ formatDate(log.timestamp) }}
      </time>
      <p class="text-base font-normal dark:text-gray-100">
        {{ log.message }}
      </p>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Log } from '../types'
import { getLogs } from '../api'

const logs = ref<Log[]>([])

onMounted(async () => {
  try {
    logs.value = await getLogs()
  } catch (error: unknown) {
    //TODO: Show error message
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
