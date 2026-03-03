<script setup lang="ts">
import { ref, computed } from 'vue'
import { Terminal, X } from 'lucide-vue-next'
import { TradingApiService } from '../../../services/trading-api-service.ts'
import type { ActivityFilter } from '../../../filters/activity-filter'
import { usePaginatedList } from '../../../composables/use-paginated-list'
import Card from '../../ui/Card.vue'
import Skeleton from '../../ui/Skeleton.vue'
import Error from '../../ui/Error.vue'
import DateRangeFilter from '../../ui/DateRangeFilter.vue'
import { formatDate } from '../../../helpers/format-helper.ts'
import type { Activity } from '../../../schemas/activity.ts'
import ActivityItem from './ActivityItem.vue'
import Pagination from '../../ui/Pagination.vue'

const api = new TradingApiService()

const filters = ref<ActivityFilter>({
  page: 1,
  limit: 20,
  startDate: undefined,
  endDate: undefined,
})

const { data, loading, error, retry, changePage } = usePaginatedList(
  (f) => api.getActivities(f),
  filters,
)

const hasFilters = computed(() => {
  return !!(filters.value.startDate || filters.value.endDate)
})

const clearFilters = () => {
  filters.value.startDate = undefined
  filters.value.endDate = undefined
  filters.value.page = 1
}

const showDateSeparator = (index: number, activities: Activity[]) => {
  if (index === 0) return true

  const currentDate = new Date(activities[index].createdAt).toDateString()
  const prevDate = new Date(activities[index - 1].createdAt).toDateString()

  return currentDate !== prevDate
}
</script>

<template>
  <Card class="overflow-hidden border-zinc-800">
    <div
      class="p-4 border-b border-zinc-800 bg-zinc-900/30 flex flex-wrap items-center gap-3"
    >
      <div class="flex items-center gap-2 mr-auto text-white">
        <Terminal class="w-5 h-5 text-emerald-400" />
        <h2 class="font-semibold text-lg">Activity history</h2>
      </div>

      <button
        v-if="hasFilters"
        class="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
        @click="clearFilters"
      >
        Clear filters
        <X class="w-3.5 h-3.5" />
      </button>

      <div v-if="hasFilters" class="h-6 w-px bg-zinc-800 hidden sm:block"></div>

      <DateRangeFilter
        v-model:start-date="filters.startDate"
        v-model:end-date="filters.endDate"
      />
    </div>

    <div class="bg-[#0a0a0a] min-h-125 flex flex-col">
      <div v-if="loading && !data?.data" class="p-4 flex flex-col gap-3">
        <Skeleton v-for="i in 10" :key="i" class="h-5 w-full bg-zinc-800/50" />
      </div>

      <div v-else-if="error" class="p-4">
        <Error message="Unable to load activities." retry @retry="retry" />
      </div>

      <div
        v-else-if="!data?.data || data.data.length === 0"
        class="flex-1 flex flex-col items-center justify-center py-12 text-zinc-500"
      >
        <Terminal class="w-10 h-10 mb-3 opacity-30" />
        <p>No activity matches the current filters.</p>
      </div>

      <div
        v-else
        class="p-4 overflow-x-auto transition-opacity duration-200 flex-1"
        :class="{ 'opacity-40 pointer-events-none': loading }"
      >
        <ul class="space-y-1 font-mono text-sm">
          <template v-for="(activity, index) in data.data" :key="activity.id">
            <li
              v-if="showDateSeparator(index, data.data)"
              class="flex justify-center my-4 first:mt-1"
            >
              <span
                class="text-xs font-sans font-medium text-zinc-400 bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-700/50"
              >
                {{ formatDate(activity.createdAt) }}
              </span>
            </li>
            <ActivityItem :activity="activity" />
          </template>
        </ul>
      </div>
    </div>

    <Pagination
      v-if="data && data.data.length > 0"
      :page="data.page"
      :limit="data.limit"
      :total="data.total"
      :last-page="data.lastPage"
      @page-change="changePage"
    />
  </Card>
</template>
