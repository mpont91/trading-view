<template>
  <div class="bg-neutral-800 rounded-lg shadow p-6">
    <h2 class="text-xl font-bold mb-4">Logs</h2>
    <div class="bg-neutral-700 p-4 rounded-lg">
      <p>
        Total errors: <span class="font-semibold">{{ logs.total_errors }}</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { DashboardLogs } from '../../types.ts'

defineProps({
  logs: {
    type: Object as PropType<DashboardLogs>,
    required: true,
  },
})
</script>
