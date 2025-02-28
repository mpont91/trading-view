<template>
  <Card>
    <h2>Status</h2>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="bg-emerald-950 text-emerald-300 p-4">
        <p>
          <span class="font-semibold"> Trading bot is running!</span>
        </p>
      </div>
      <div class="bg-sky-950 text-sky-300 p-4">
        <p>
          <span class="font-semibold"> Uptime: {{ formatTime(uptime) }} </span>
        </p>
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from '../common/Card.vue'
import { formatTime } from '../../helpers/format-helper.ts'

defineProps({
  uptime: {
    type: Number,
    required: true,
  },
})
</script>
