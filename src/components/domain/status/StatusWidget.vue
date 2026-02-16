<script setup lang="ts">
import { TradingApiService } from '../../../services/trading-api-service.ts'
import { formatDuration } from '../../../helpers/format-helper.ts'
import { Activity, Clock } from 'lucide-vue-next'
import { useAsync } from '../../../composables/use-async'

import Card from '../../ui/Card.vue'
import Skeleton from '../../ui/Skeleton.vue'
import Error from '../../ui/Error.vue'
import {
  getHealthVariant,
  PANEL_STYLES,
  TEXT_STYLES,
} from '../../../helpers/variant-helper.ts'

const api = new TradingApiService()

const fetchStatus = async () => {
  const [health, uptime] = await Promise.all([api.getHealth(), api.getUptime()])
  return { health, uptime }
}

const { data: status, loading, error, execute: retry } = useAsync(fetchStatus)
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
      @retry="retry"
    />

    <div v-else-if="status" class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div
        class="border p-3 rounded flex items-center gap-3 transition-colors"
        :class="PANEL_STYLES[getHealthVariant(status.health)]"
      >
        <div class="relative flex h-3 w-3">
          <span
            v-if="status.health"
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-3 w-3"
            :class="status.health ? 'bg-emerald-500' : 'bg-red-500'"
          ></span>
        </div>
        <span
          class="font-medium text-sm"
          :class="TEXT_STYLES[getHealthVariant(status.health)]"
        >
          {{ status.health ? 'Bot Running' : 'Bot Stopped' }}
        </span>
      </div>

      <div
        class="border p-3 rounded flex items-center gap-3"
        :class="PANEL_STYLES.info"
      >
        <Clock class="w-4 h-4 text-sky-400" />
        <span class="font-medium text-sm" :class="TEXT_STYLES.info">
          {{ formatDuration(status.uptime) }}
        </span>
      </div>
    </div>
  </Card>
</template>
