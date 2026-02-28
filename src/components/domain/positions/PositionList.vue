<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, ArrowRight, Clock } from 'lucide-vue-next'
import DataTable from '../../ui/DataTable.vue'
import {
  formatCurrency,
  formatDate,
  formatDurationRange,
  formatQuantity,
  formatTime,
} from '../../../helpers/format-helper.ts'
import TableFilter from '../../ui/TableFilter.vue'
import {
  getSymbolLabel,
  getSymbolOptions,
} from '../../../helpers/symbol-helper.ts'
import DateRangeFilter from '../../ui/DateRangeFilter.vue'
import type { PositionFilter } from '../../../filters/position-filter.ts'
import Badge from '../../ui/Badge.vue'
import { getPositionStatusVariant } from '../../../helpers/variant-helper.ts'
import { useLivePositions } from '../../../composables/use-live-positions.ts'
import { PositionStatus } from '../../../schemas/position.ts'
import PnL from '../../ui/PnL.vue'

const filters = ref<PositionFilter>({
  page: 1,
  limit: 10,
  symbol: undefined,
  startDate: undefined,
  endDate: undefined,
})

const { data, loading, error, retry, changePage } = useLivePositions(filters)

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

      <div v-if="hasFilters" class="h-6 w-px mr-2"></div>
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
            v-if="item.status === PositionStatus.OPEN"
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

      <td class="py-3 pr-4 text-right">
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
        </div>
      </td>

      <td class="py-3 pr-4 text-right">
        <PnL :pnl="item.pnl" :pnl-percent="item.pnlPercent" />
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
              {{ formatDurationRange(item.entryTime, item.exitTime) }}
            </span>
          </div>
        </div>
      </td>
    </template>
  </DataTable>
</template>
