<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, ArrowRight, Clock, TrendingUp, TrendingDown } from 'lucide-vue-next'
import { TradingApi } from '../../../services/trading-api'
import { usePaginatedList } from '../../../composables/use-paginated-list'
import DataTable from '../../ui/DataTable.vue'
import {
  formatCurrency,
  formatDate,
  formatPercentage,
  formatQuantity,
  formatTime,
} from '../../../utils/format.ts'
import TableFilter from '../../ui/TableFilter.vue'
import {
  getPositionStatusVariant,
  getSymbolLabel,
  getSymbolOptions,
} from '../../../utils/trading.ts'
import DateRangeFilter from '../../ui/DateRangeFilter.vue'
import type { PositionFilter } from '../../../filters/position-filter.ts'
import Badge from '../../ui/Badge.vue'

const api = new TradingApi()

const filters = ref<PositionFilter>({
  page: 1,
  limit: 10,
  symbol: undefined,
  startDate: undefined,
  endDate: undefined,
})

const { data, loading, error, retry, changePage } = usePaginatedList(
  (f) => api.getPositions(f),
  filters,
)

const hasFilters = computed(() => {
  return !!(
    filters.value.symbol ||
    filters.value.startDate ||
    filters.value.endDate
  )
})

const clearFilters = () => {
  filters.value.symbol = undefined
  filters.value.startDate = undefined
  filters.value.endDate = undefined
  filters.value.page = 1
}

const getDurationLabel = (start: string | Date, end?: string | Date | null) => {
  if (!end) return 'Active'
  const diff = new Date(end).getTime() - new Date(start).getTime()

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours > 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

const getPnLColor = (value?: number) => {
  if (!value) return 'text-zinc-400'
  return value > 0 ? 'text-emerald-400' : 'text-red-400'
}
</script>

<template>
  <DataTable
    title="Positions History"
    :loading="loading"
    :error="error"
    :data="data"
    @retry="retry"
    @page-change="changePage"
  >
    <template #filters>
      <button
        v-if="hasFilters"
        class="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors mr-2"
        @click="clearFilters"
      >
        Clear filters
        <X class="w-3.5 h-3.5" />
      </button>

      <div
        v-if="hasFilters"
        class="h-6 w-px bg-zinc-800 mr-2 hidden sm:block"
      ></div>
      <DateRangeFilter
        v-model:start-date="filters.startDate"
        v-model:end-date="filters.endDate"
      />

      <TableFilter v-model="filters.symbol" :options="getSymbolOptions()" />
    </template>

    <template #columns>
      <th class="py-3 pl-4">Symbol</th>
      <th class="py-3 pr-4 text-right">Quantity</th>
      <th class="py-3 pr-4 text-right">Entry / Exit Price</th>
      <th class="py-3 pr-4 text-right">PnL</th>
      <th class="py-3 pr-4 text-right">Time</th>
    </template>

    <template #row="{ item }">
      <td class="py-3 pl-4">
        <div class="flex flex-col">
          <span class="font-bold">
            {{ getSymbolLabel(item.symbol) }}
          </span>
          <Badge
            :variant="getPositionStatusVariant(item.status)"
            class="font-bold tracking-wider w-fit"
          >
            {{ item.status }}
          </Badge>
        </div>
      </td>

      <td class="py-3 pr-4 text-right">
        <div class="font-mono">
          {{ formatQuantity(item.quantity) }}
        </div>
      </td>

      <td class="py-3 text-right">
        <div class="flex flex-col items-end gap-0.5">
          <span class="font-mono">
            {{ formatCurrency(item.entryPrice) }}
          </span>

          <div
            v-if="item.exitPrice"
            class="flex items-center gap-1 text-xs font-mono text-zinc-500"
          >
            <ArrowRight class="w-3 h-3 opacity-50" />
            {{ formatCurrency(item.exitPrice) }}
          </div>
          <div v-else class="text-xs text-blue-400/50 italic">Active</div>
        </div>
      </td>

      <td class="py-3 px-2 text-right">
        <div
          v-if="item.pnl && item.pnlPercent"
          class="flex flex-col items-end"
          :class="getPnLColor(item.pnl)"
        >
          <span class="font-bold font-mono">
            {{ item.pnl > 0 ? '+' : '' }}{{ formatCurrency(item.pnl) }}
          </span>
          <div
            class="flex items-center gap-1 text-xs bg-zinc-900/50 px-1.5 py-0.5 rounded"
          >
            <TrendingUp v-if="item.pnl > 0" class="w-3 h-3" />
            <TrendingDown v-else class="w-3 h-3" />
            {{ formatPercentage(item.pnlPercent) }}
          </div>
        </div>
        <div v-else class="text-zinc-600 text-sm">--</div>
      </td>

      <td class="py-3 pr-4 text-right">
        <div class="flex flex-col items-end">
          <span class="font-medium text-zinc-300">
            {{ formatDate(item.entryTime) }}
          </span>
          <div class="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5">
            <span class="opacity-75">{{ formatTime(item.entryTime) }}</span>

            <span class="w-1 h-1 rounded-full bg-zinc-700"></span>

            <span class="flex items-center gap-1 text-zinc-400">
              <Clock class="w-3 h-3" />
              {{ getDurationLabel(item.entryTime, item.exitTime) }}
            </span>
          </div>
        </div>
      </td>
    </template>
  </DataTable>
</template>
