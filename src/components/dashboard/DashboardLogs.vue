<template>
  <div class="bg-neutral-800 shadow p-6">
    <h2>Logs</h2>
    <div class="bg-neutral-700 p-4">
      <p>
        Total errors: <span class="font-semibold">{{ logs.total_errors }}</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { DashboardLogs } from '../../models/dashboard.ts'

defineProps({
  logs: {
    type: Object as PropType<DashboardLogs>,
    required: true,
  },
})
</script>
