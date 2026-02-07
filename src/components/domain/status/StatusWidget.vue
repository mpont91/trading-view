<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TradingApi } from '../../../services/trading-api'
import { formatTime } from '../../../utils/format'
import { Activity, Clock } from 'lucide-vue-next'

import Card from '../../ui/Card.vue'
import Skeleton from '../../ui/Skeleton.vue'
import Error from '../../ui/Error.vue'

const api = new TradingApi()
const uptime = ref<number>(0)
const loading = ref(true)
const error = ref(false)

const fetchUptime = async () => {
  loading.value = true
  error.value = false
  try {
    uptime.value = await api.getUptime()
  } catch (e) {
    console.error(e)
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUptime()
})
</script>

<template>
  <Card>
    <template #header>
      <div class="flex items-center gap-2 text-white">
        <Activity class="w-5 h-5 text-emerald-400" />
        <h2 class="font-semibold text-lg">System Status</h2>
      </div>
    </template>

    <div v-if="loading" class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Skeleton class="h-12 w-full" />
      <Skeleton class="h-12 w-full" />
    </div>

    <Error
      v-else-if="error"
      message="Unable to connect to the bot."
      retry
      @retry="fetchUptime"
    />

    <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div
        class="bg-emerald-950/30 border border-emerald-900/50 p-3 rounded flex items-center gap-3"
      >
        <div class="relative flex h-3 w-3">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
          ></span>
        </div>
        <span class="text-emerald-300 font-medium text-sm">Bot Running</span>
      </div>

      <div
        class="bg-sky-950/30 border border-sky-900/50 p-3 rounded flex items-center gap-3"
      >
        <Clock class="w-4 h-4 text-sky-400" />
        <span class="text-sky-300 font-medium text-sm">
          {{ formatTime(uptime) }}
        </span>
      </div>
    </div>
  </Card>
</template>
