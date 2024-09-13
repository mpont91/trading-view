<template>
  <div class="bg-neutral-800 rounded-lg shadow p-6">
    <h2 class="text-xl font-bold mb-4">Logs</h2>
    <div class="bg-neutral-700 p-4 rounded-lg">
      <p>
        Total errors: <span class="font-semibold">{{ totalErrors }}</span>
      </p>
      <p>Last log:</p>
      <div class="bg-neutral-600 p-3 mt-2 rounded-lg">
        <p><span class="font-semibold">Level:</span> {{ lastLog.level }}</p>
        <p>
          <span class="font-semibold">Message:</span>
          {{ lastLog.message }}
        </p>
        <p>
          <span class="font-semibold">Timestamp:</span>
          {{ formatDate(lastLog.timestamp) }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatDate } from '../utils.ts'
import type { Log } from '../types.ts'

defineProps<{
  totalErrors: number
  lastLog: Log
}>()
</script>
