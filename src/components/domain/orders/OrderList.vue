<script setup lang="ts">
import { ref, computed } from 'vue'
import { X } from 'lucide-vue-next'
import { TradingApiService } from '../../../services/trading-api-service.ts'
import type { OrderFilter } from '../../../filters/order-filter'
import { usePaginatedList } from '../../../composables/use-paginated-list'
import DataTable from '../../ui/DataTable.vue'
import {
  formatCurrency,
  formatDate,
  formatQuantity,
  formatTime,
} from '../../../helpers/format-helper.ts'
import TableFilter from '../../ui/TableFilter.vue'
import Badge from '../../ui/Badge.vue'
import {
  getSymbolLabel,
  getSymbolOptions,
} from '../../../helpers/symbol-helper.ts'
import DateRangeFilter from '../../ui/DateRangeFilter.vue'
import { getOrderSideOptions } from '../../../helpers/option-helper.ts'
import { getOrderSideVariant } from '../../../helpers/variant-helper.ts'

const api = new TradingApiService()

const filters = ref<OrderFilter>({
  page: 1,
  limit: 10,
  symbol: undefined,
  side: undefined,
  startDate: undefined,
  endDate: undefined,
})

const { data, loading, error, retry, changePage } = usePaginatedList(
  (f) => api.getOrders(f),
  filters,
)

const hasFilters = computed(() => {
  return !!(
    filters.value.symbol ||
    filters.value.side ||
    filters.value.startDate ||
    filters.value.endDate
  )
})

const clearFilters = () => {
  filters.value.symbol = undefined
  filters.value.side = undefined
  filters.value.startDate = undefined
  filters.value.endDate = undefined
  filters.value.page = 1
}
</script>

<template>
  <DataTable
    title="Orders History"
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

      <TableFilter v-model="filters.side" :options="getOrderSideOptions()" />
    </template>

    <template #columns>
      <th class="py-3 pl-4">Date</th>
      <th class="py-3 pl-4">Symbol</th>
      <th class="py-3 pl-4">Side</th>
      <th class="py-3 pr-4 text-right">Quantity</th>
      <th class="py-3 pr-4 text-right">Price</th>
      <th class="py-3 pr-4 text-right">Cost</th>
      <th class="py-3 pr-4 text-right">Fees</th>
    </template>

    <template #row="{ item }">
      <td class="py-3 pl-4">
        <div class="flex flex-col">
          <span class="font-bold">
            {{ formatDate(item.createdAt) }}
          </span>
          <span class="text-xs text-zinc-500">
            {{ formatTime(item.createdAt) }}
          </span>
        </div>
      </td>

      <td class="py-3 font-bold">
        {{ getSymbolLabel(item.symbol) }}
      </td>

      <td class="py-3">
        <Badge :variant="getOrderSideVariant(item.side)">
          {{ item.side }}
        </Badge>
      </td>

      <td class="py-3 pr-4 text-right font-mono">
        {{ formatQuantity(item.quantity) }}
      </td>

      <td class="py-3 pr-4 text-right font-mono">
        {{ formatCurrency(item.price) }}
      </td>

      <td class="py-3 pr-4 text-right font-mono">
        {{ formatCurrency(item.cost) }}
      </td>

      <td class="py-3 pr-4 text-right font-mono">
        {{ formatCurrency(item.fees) }}
      </td>
    </template>
  </DataTable>
</template>
