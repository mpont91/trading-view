<script setup lang="ts">
import { Terminal } from 'lucide-vue-next'
import { TradingApiService } from '../../../services/trading-api-service.ts'
import { useAsync } from '../../../composables/use-async'
import Card from '../../ui/Card.vue'
import Skeleton from '../../ui/Skeleton.vue'
import Error from '../../ui/Error.vue'
import ActivityItem from './ActivityItem.vue'

const api = new TradingApiService()

const {
  data: response,
  loading,
  error,
  execute: retry,
} = useAsync(() => api.getActivities({ page: 1, limit: 20 }))
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
      v-else-if="!response?.data.length && !loading"
      class="flex flex-col items-center justify-center py-8 text-zinc-500 border border-dashed border-zinc-800 rounded-lg"
    >
      <Terminal class="w-8 h-8 mb-2 opacity-50" />
      <p class="text-sm">No activity recorded yet.</p>
    </div>

    <div
      v-else
      class="bg-[#0a0a0a] rounded-lg p-4 font-mono text-xs sm:text-sm overflow-x-auto border border-zinc-800/80 shadow-inner flex flex-col justify-end min-h-70"
    >
      <ul class="space-y-1.5">
        <ActivityItem
          v-for="activity in response?.data || []"
          :key="activity.id"
          :activity="activity"
        />
      </ul>
    </div>
  </Card>
</template>
