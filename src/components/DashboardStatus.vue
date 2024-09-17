<template>
  <div class="bg-neutral-800 rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">Bot status</h2>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div class="bg-green-950 text-green-300 p-4 rounded-lg">
        <p>
          Status:
          <span class="font-semibold">
            {{ active ? 'Active' : 'Inactive' }}
          </span>
        </p>
      </div>
      <div class="bg-blue-950 text-blue-300 p-4 rounded-lg">
        <p>
          Last activity:
          <span class="font-semibold">{{ formatDate(lastActivity) }}</span>
        </p>
      </div>
      <div class="bg-yellow-950 text-yellow-300 p-4 rounded-lg">
        <p>
          Uptime: <span class="font-semibold">{{ formatTime(uptime) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatDate, formatTime } from '../utils.ts'

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  lastActivity: {
    type: String,
    default: '',
  },
  uptime: {
    type: Number,
    default: 0,
  },
})
</script>
