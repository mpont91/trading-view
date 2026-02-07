<script setup lang="ts">
import { ref } from 'vue'
import { Filter } from 'lucide-vue-next'

import { TradingApi } from '../../../services/trading-api'
import type { EvaluationFilter } from '../../../filters/evaluation-filter'
import { usePaginatedList } from '../../../composables/use-paginated-list'

import DataTable from '../../ui/DataTable.vue'

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

const getActionClass = (action: string) => {
  switch (action) {
    case 'BUY':
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    case 'HOLD':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    case 'SELL':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    default:
      return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
  }
}
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
      <div class="relative">
        <Filter
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
        />
        <select
          v-model="filters.symbol"
          class="pl-9 pr-8 py-1.5 bg-zinc-950 border border-zinc-700 rounded-md text-sm text-white focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer w-full sm:w-auto transition-colors"
        >
          <option :value="undefined">All symbols</option>
          <option value="BTCUSDC">BTCUSDC</option>
          <option value="ETHUSDC">ETHUSDC</option>
          <option value="SOLUSDC">SOLUSDC</option>
        </select>
      </div>

      <div class="relative">
        <Filter
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
        />
        <select
          v-model="filters.action"
          class="pl-9 pr-8 py-1.5 bg-zinc-950 border border-zinc-700 rounded-md text-sm text-white focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer w-full sm:w-auto transition-colors"
        >
          <option :value="undefined">All actions</option>
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
          <option value="HOLD">Hold</option>
        </select>
      </div>
    </template>

    <template #columns>
      <th class="py-3 pl-4 font-medium text-zinc-400">Date</th>
      <th class="py-3 font-medium text-zinc-400">Symbol</th>
      <th class="py-3 font-medium text-zinc-400">Action</th>
      <th class="py-3 pr-4 text-right font-medium text-zinc-400">Price</th>
    </template>

    <template #row="{ item }">
      <td class="py-3 pl-4 text-zinc-300">
        <div class="flex flex-col">
          <span class="text-white">
            {{ item.createdAt.toLocaleDateString() }}
          </span>
          <span class="text-xs text-zinc-500">
            {{
              item.createdAt.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            }}
          </span>
        </div>
      </td>

      <td class="py-3 font-bold text-white">
        {{ item.symbol }}
      </td>

      <td class="py-3">
        <span
          class="px-2.5 py-0.5 rounded text-xs font-semibold border"
          :class="getActionClass(item.action)"
        >
          {{ item.action }}
        </span>
      </td>

      <td class="py-3 pr-4 text-right text-zinc-300 font-mono">
        ${{
          item.price.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
          })
        }}
      </td>
    </template>
  </DataTable>
</template>
