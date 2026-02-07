<script setup lang="ts">
import { ref, watch } from 'vue'

import type { Evaluation } from '../../../schemas/evaluation.ts'
import { TradingApi } from '../../../services/trading-api'
import type { Paginated } from '../../../schemas/paginated.ts'
import type { EvaluationFilter } from '../../../filters/evaluation-filter.ts'
import { useAsync } from '../../../composables/use-async'

import Card from '../../ui/Card.vue'
import Skeleton from '../../ui/Skeleton.vue'
import Error from '../../ui/Error.vue'
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const api = new TradingApi()

const filters = ref<EvaluationFilter>({
  page: 1,
  limit: 10,
  symbol: undefined,
  action: undefined,
})

const fetchEvaluations = async () => {
  return await api.getEvaluations(filters.value)
}

const {
  data: result,
  loading,
  error,
  execute,
} = useAsync<Paginated<Evaluation>>(fetchEvaluations)

watch(
  filters,
  () => {
    execute()
  },
  { deep: true },
)

const changePage = (newPage: number) => {
  if (!result.value) return
  if (newPage >= 1 && newPage <= result.value.lastPage) {
    filters.value.page = newPage
  }
}

const onFilterChange = () => {
  filters.value.page = 1
}

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
  <Card>
    <template #header>
      <div
        class="flex flex-col md:flex-row gap-4 justify-between md:items-center"
      >
        <h2 class="font-semibold text-lg text-white">Market Opportunities</h2>

        <div class="flex flex-col sm:flex-row gap-2">
          <div class="relative">
            <Filter
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
            />
            <select
              v-model="filters.symbol"
              class="pl-9 pr-8 py-1.5 bg-zinc-950 border border-zinc-700 rounded-md text-sm text-white focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer w-full sm:w-auto transition-colors"
              @change="onFilterChange"
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
              @change="onFilterChange"
            >
              <option :value="undefined">All actions</option>
              <option value="BUY">Buy</option>
              <option value="SELL">Sell</option>
              <option value="HOLD">Hold</option>
            </select>
          </div>
        </div>
      </div>
    </template>

    <div v-if="loading" class="space-y-4">
      <div v-for="i in 5" :key="i" class="flex gap-4 p-2">
        <Skeleton class="h-8 w-1/6" />
        <Skeleton class="h-8 w-1/6" />
        <Skeleton class="h-8 w-1/6" />
        <Skeleton class="h-8 w-1/2" />
      </div>
    </div>

    <Error
      v-else-if="error"
      message="The evaluations could not be loaded. Check your connection to the bot."
      retry
      @retry="execute"
    />

    <div
      v-else-if="!result || result.data.length === 0"
      class="py-12 flex flex-col items-center justify-center text-zinc-500 gap-2"
    >
      <Search class="w-8 h-8 opacity-50" />
      <p>No results were found with these filters.</p>
    </div>

    <div v-else>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="text-zinc-400 font-medium border-b border-zinc-800">
            <tr>
              <th class="pb-3 pl-2">Date</th>
              <th class="pb-3">Symbol</th>
              <th class="pb-3">Action</th>
              <th class="pb-3 text-right">Price</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-800/50">
            <tr
              v-for="item in result.data"
              :key="item.id"
              class="group hover:bg-zinc-800/30 transition-colors"
            >
              <td class="py-3 pl-2 text-zinc-300">
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

              <td class="py-3 text-right text-zinc-300 font-mono">
                ${{
                  item.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500"
      >
        <span>
          Showing
          <strong class="text-zinc-300">{{ result.data.length }}</strong> of
          <strong class="text-zinc-300">{{ result.total }}</strong> results
        </span>

        <div class="flex items-center gap-2">
          <button
            :disabled="filters.page === 1"
            class="p-1 rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-zinc-400 hover:text-white"
            aria-label="Previous page"
            @click="changePage(filters.page - 1)"
          >
            <ChevronLeft class="w-4 h-4" />
          </button>

          <span class="font-medium text-zinc-300">
            Page {{ result.page }} of {{ result.lastPage }}
          </span>

          <button
            :disabled="filters.page === result.lastPage"
            class="p-1 rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-zinc-400 hover:text-white"
            aria-label="Next page"
            @click="changePage(filters.page + 1)"
          >
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </Card>
</template>
