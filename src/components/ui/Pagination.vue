<script setup lang="ts">
import { computed } from 'vue'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-vue-next'

const props = defineProps<{
  page: number
  limit: number
  total: number
  lastPage: number
}>()

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const startItem = computed(() => {
  if (props.total === 0) return 0
  return (props.page - 1) * props.limit + 1
})

const endItem = computed(() => {
  if (props.total === 0) return 0
  return Math.min(props.page * props.limit, props.total)
})
</script>

<template>
  <div
    class="px-4 py-3 border-t border-zinc-800 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-zinc-500 bg-zinc-900/30"
  >
    <span class="text-center sm:text-left">
      Showing
      <strong class="text-zinc-300 font-medium">{{ startItem }}</strong> to
      <strong class="text-zinc-300 font-medium">{{ endItem }}</strong> of
      <strong class="text-zinc-300 font-medium">{{ total }}</strong> results
    </span>

    <div class="flex items-center gap-1.5">
      <button
        :disabled="page === 1"
        class="p-1 rounded hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent text-zinc-400 hover:text-white transition-colors"
        title="First Page"
        @click="emit('pageChange', 1)"
      >
        <ChevronsLeft class="w-4 h-4" />
      </button>

      <button
        :disabled="page === 1"
        class="p-1 rounded hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent text-zinc-400 hover:text-white transition-colors"
        title="Previous Page"
        @click="emit('pageChange', page - 1)"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>

      <span class="px-2 font-medium text-zinc-300 select-none">
        Page {{ page }} of {{ lastPage }}
      </span>

      <button
        :disabled="page === lastPage"
        class="p-1 rounded hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent text-zinc-400 hover:text-white transition-colors"
        title="Next Page"
        @click="emit('pageChange', page + 1)"
      >
        <ChevronRight class="w-4 h-4" />
      </button>

      <button
        :disabled="page === lastPage"
        class="p-1 rounded hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent text-zinc-400 hover:text-white transition-colors"
        title="Last Page"
        @click="emit('pageChange', lastPage)"
      >
        <ChevronsRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
