<template>
  <div class="bg-neutral-800 shadow p-6 mb-6">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="bg-green-950 text-green-300 p-4">
        <p>
          Status:
          <span class="font-semibold">
            {{ status.active ? 'Active' : 'Inactive' }}
          </span>
        </p>
      </div>
      <div class="bg-yellow-950 text-yellow-300 p-4">
        <p>
          Uptime:
          <span class="font-semibold">{{ formatTime(status.uptime) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatTime } from '../../helpers/format-helper.ts'
import type { DashboardStatus } from '../../models/dashboard.ts'
import type { PropType } from 'vue'

defineProps({
  status: {
    type: Object as PropType<DashboardStatus>,
    required: true,
  },
})
</script>
