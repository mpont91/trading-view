<script setup lang="ts" generic="T">
import Skeleton from './Skeleton.vue'
import ErrorComponent from './Error.vue'
import { Search } from 'lucide-vue-next'
import type { Paginated } from '../../schemas/paginated'
import { computed } from 'vue'
import Pagination from './Pagination.vue'

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
    class="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-sm flex flex-col"
  >
    <div class="p-4 border-b border-zinc-800 bg-zinc-900/50 shrink-0">
      <div
        class="flex flex-col md:flex-row gap-4 justify-between md:items-center"
      >
        <h2>{{ title }}</h2>

        <div class="flex flex-col sm:flex-row gap-2">
          <slot name="filters" />
        </div>
      </div>
    </div>

    <div class="p-0 flex flex-col min-h-125">
      <div v-if="loading && !data?.data" class="p-4 space-y-4 flex-1">
        <div v-for="i in 10" :key="i" class="flex gap-4">
          <Skeleton class="h-8 w-full" />
        </div>
      </div>

      <div
        v-else-if="error && !data?.data"
        class="p-4 flex-1 flex flex-col justify-center"
      >
        <ErrorComponent :message="errorMessage" retry @retry="emit('retry')" />
      </div>

      <div
        v-else-if="!data || data.data.length === 0"
        class="py-12 flex-1 flex flex-col items-center justify-center text-zinc-500 gap-2"
      >
        <Search class="w-8 h-8 opacity-50" />
        <p>No results found.</p>
      </div>

      <div v-else class="flex flex-col flex-1">
        <div
          class="overflow-x-auto flex-1 transition-opacity duration-200"
          :class="{ 'opacity-40 pointer-events-none': loading }"
        >
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

        <Pagination
          :page="data.page"
          :limit="data.limit"
          :total="data.total"
          :last-page="data.lastPage"
          class="shrink-0"
          @page-change="emit('pageChange', $event)"
        />
      </div>
    </div>
  </div>
</template>
