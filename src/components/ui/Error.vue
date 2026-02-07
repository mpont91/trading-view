<script setup lang="ts">
import { AlertTriangle } from 'lucide-vue-next'

defineProps<{
  message?: string
  retry?: boolean
}>()

const emit = defineEmits(['retry'])
</script>

<template>
  <div
    class="bg-red-950/20 border border-red-900/50 rounded-md p-4 flex items-start gap-3"
  >
    <AlertTriangle class="w-5 h-5 text-red-400 shrink-0 mt-0.5" />

    <div class="grow">
      <h4 class="text-sm font-medium text-red-200">An error has occurred</h4>
      <p class="text-sm text-red-300/80 mt-1">
        {{ message || 'Something went wrong...' }}
      </p>

      <button
        v-if="retry"
        class="mt-2 text-xs font-semibold text-red-400 hover:text-red-300 underline"
        @click="emit('retry')"
      >
        Try again
      </button>
    </div>
  </div>
</template>
