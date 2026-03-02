<script setup lang="ts">
import { computed } from 'vue'
import { Terminal } from 'lucide-vue-next'
import { TradingApiService } from '../../../services/trading-api-service.ts'
import { useAsync } from '../../../composables/use-async'
import Card from '../../ui/Card.vue'
import Skeleton from '../../ui/Skeleton.vue'
import Error from '../../ui/Error.vue'
import { formatTime } from '../../../helpers/format-helper.ts'

const api = new TradingApiService()

const {
  data: response,
  loading,
  error,
  execute: retry,
} = useAsync(() => api.getActivities({ page: 1, limit: 15 }))

const getLevelConfig = (level: string) => {
  switch (level) {
    case 'INFO':
      return { color: 'text-blue-400', icon: '●' }
    case 'WARN':
      return { color: 'text-yellow-400', icon: '⚠' }
    case 'ERROR':
      return { color: 'text-red-500', icon: '✖' }
    case 'SUCCESS':
      return { color: 'text-green-400', icon: '✔' }
    default:
      return { color: 'text-zinc-500', icon: '○' }
  }
}

const logs = computed(() => {
  if (!response.value?.data) return []
  return [...response.value.data].reverse()
})
</script>

<template>
  <Card>
    <template #header>
      <div class="flex items-center gap-2 text-white">
        <Terminal class="w-5 h-5 text-emerald-400" />
        <h2 class="font-semibold text-lg">Last Activity</h2>
      </div>
    </template>

    <div v-if="loading && !response" class="flex flex-col gap-2 p-2">
      <Skeleton class="h-5 w-full bg-zinc-800/50" />
      <Skeleton class="h-5 w-3/4 bg-zinc-800/50" />
      <Skeleton class="h-5 w-5/6 bg-zinc-800/50" />
    </div>

    <Error
      v-else-if="error"
      message="Unable to load live activity."
      retry
      @retry="retry"
    />

    <div
      v-else-if="!logs.length && !loading"
      class="flex flex-col items-center justify-center py-8 text-zinc-500 border border-dashed border-zinc-800 rounded-lg"
    >
      <Terminal class="w-8 h-8 mb-2 opacity-50" />
      <p class="text-sm">No activity recorded yet.</p>
    </div>

    <div
      v-else
      class="bg-[#0a0a0a] rounded-lg p-4 font-mono text-xs sm:text-sm overflow-x-auto border border-zinc-800/80 shadow-inner flex flex-col justify-end min-h-[280px]"
    >
      <ul class="space-y-1.5">
        <li
          v-for="log in logs"
          :key="log.id"
          class="flex gap-3 whitespace-nowrap hover:bg-zinc-800/40 px-1.5 py-0.5 rounded transition-colors"
        >
          <span class="text-zinc-600 shrink-0 select-none">
            [{{ formatTime(log.createdAt) }}]
          </span>

          <span class="text-zinc-500 shrink-0 min-w-37.5 select-none">
            [{{ log.context }}]
          </span>

          <span
            :class="[
              'font-bold shrink-0 select-none',
              getLevelConfig(log.level).color,
            ]"
          >
            {{ getLevelConfig(log.level).icon }}
          </span>

          <span
            :class="
              log.level === 'ERROR'
                ? 'text-red-400 font-medium'
                : 'text-zinc-300'
            "
          >
            {{ log.message }}
          </span>
        </li>
      </ul>
    </div>
  </Card>
</template>
