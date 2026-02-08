<script setup lang="ts" generic="T">
import Skeleton from './Skeleton.vue'
import ErrorComponent from './Error.vue'
import { Search, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { Paginated } from '../../schemas/paginated'
import { computed } from 'vue'

const props = defineProps<{
  title: string
  loading: boolean
  error: Error | null
  data: Paginated<T> | null
}>()

const emit = defineEmits<{
  retry: []
  pageChange: [page: number]
}>()

const errorMessage = computed(() => {
  return props.error?.message ?? 'An unexpected error occurred.'
})
</script>

<template>
  <div
    class="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-sm"
  >
    <div class="p-4 border-b border-zinc-800 bg-zinc-900/50">
      <div
        class="flex flex-col md:flex-row gap-4 justify-between md:items-center"
      >
        <h2>{{ title }}</h2>

        <div class="flex flex-col sm:flex-row gap-2">
          <slot name="filters" />
        </div>
      </div>
    </div>

    <div class="p-0">
      <div v-if="loading" class="p-4 space-y-4">
        <div v-for="i in 5" :key="i" class="flex gap-4">
          <Skeleton class="h-8 w-full" />
        </div>
      </div>

      <div v-else-if="error" class="p-4">
        <ErrorComponent :message="errorMessage" retry @retry="emit('retry')" />
      </div>

      <div
        v-else-if="!data || data.data.length === 0"
        class="py-12 flex flex-col items-center justify-center text-zinc-500 gap-2"
      >
        <Search class="w-8 h-8 opacity-50" />
        <p>No results found.</p>
      </div>

      <div v-else>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead
              class="text-zinc-400 font-medium border-b border-zinc-800 bg-zinc-900/50"
            >
              <tr>
                <slot name="columns" />
              </tr>
            </thead>

            <tbody class="divide-y divide-zinc-800/50">
              <tr
                v-for="(item, index) in data.data"
                :key="index"
                class="group hover:bg-zinc-800/30 transition-colors"
              >
                <slot name="row" :item="item" />
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="px-4 py-3 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500 bg-zinc-900/30"
        >
          <span>
            Showing
            <strong class="text-zinc-300">{{ data.data.length }}</strong> of
            <strong class="text-zinc-300">{{ data.total }}</strong>
          </span>

          <div class="flex items-center gap-2">
            <button
              :disabled="data.page === 1"
              class="p-1 rounded hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent text-zinc-400 hover:text-white transition-colors"
              @click="emit('pageChange', data.page - 1)"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>

            <span class="font-medium text-zinc-300">
              Page {{ data.page }} of {{ data.lastPage }}
            </span>

            <button
              :disabled="data.page === data.lastPage"
              class="p-1 rounded hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent text-zinc-400 hover:text-white transition-colors"
              @click="emit('pageChange', data.page + 1)"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
