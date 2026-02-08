<script setup lang="ts">
import { ref } from 'vue'

import { TradingApi } from '../../../services/trading-api'
import type { EvaluationFilter } from '../../../filters/evaluation-filter'
import { usePaginatedList } from '../../../composables/use-paginated-list'

import DataTable from '../../ui/DataTable.vue'
import {
  formatCurrency,
  formatDate,
  formatTime,
} from '../../../utils/format.ts'
import TableFilter from '../../ui/TableFilter.vue'
import Badge from '../../ui/Badge.vue'

const api = new TradingApi()

const filters = ref<EvaluationFilter>({
  page: 1,
  limit: 10,
  symbol: undefined,
  action: undefined,
})

const { data, loading, error, retry, changePage } = usePaginatedList(
  (f) => api.getEvaluations(f),
  filters,
)

const getVariant = (action: string) => {
  if (action === 'BUY') return 'success'
  if (action === 'SELL') return 'error'
  if (action === 'HOLD') return 'warning'
  return 'neutral'
}

const symbolOptions = [
  { value: 'BTCUSDC', label: 'BTCUSDC' },
  { value: 'ETHUSDC', label: 'ETHUSDC' },
  { value: 'SOLUSDC', label: 'SOLUSDC' },
]

const actionOptions = [
  { value: 'BUY', label: 'Buy' },
  { value: 'SELL', label: 'Sell' },
  { value: 'HOLD', label: 'Hold' },
]
</script>

<template>
  <DataTable
    title="Market Opportunities"
    :loading="loading"
    :error="error"
    :data="data"
    @retry="retry"
    @page-change="changePage"
  >
    <template #filters>
      <TableFilter
        v-model="filters.symbol"
        placeholder="All symbols"
        :options="symbolOptions"
      />

      <TableFilter
        v-model="filters.action"
        placeholder="All actions"
        :options="actionOptions"
      />
    </template>

    <template #columns>
      <th class="py-3 pl-4">Date</th>
      <th class="py-3">Symbol</th>
      <th class="py-3">Action</th>
      <th class="py-3 pr-4 text-right">Price</th>
    </template>

    <template #row="{ item }">
      <td class="py-3 pl-4">
        <div class="flex flex-col">
          <span class="text-white">
            {{ formatDate(item.createdAt) }}
          </span>
          <span class="text-xs text-zinc-500">
            {{ formatTime(item.createdAt) }}
          </span>
        </div>
      </td>

      <td class="py-3 font-bold text-white">
        {{ item.symbol }}
      </td>

      <td class="py-3">
        <Badge :variant="getVariant(item.action)">
          {{ item.action }}
        </Badge>
      </td>

      <td class="py-3 pr-4 text-right font-mono">
        {{ formatCurrency(item.price) }}
      </td>
    </template>
  </DataTable>
</template>
