<script setup lang="ts">
import { TradingApiService } from '../../../services/trading-api-service.ts'
import {
  formatCurrency,
  formatPercentage,
} from '../../../helpers/format-helper.ts'
import { BarChart2, DollarSign, Target, Receipt, Hash } from 'lucide-vue-next'

import { useAsync } from '../../../composables/use-async'
import Card from '../../ui/Card.vue'
import Skeleton from '../../ui/Skeleton.vue'
import Error from '../../ui/Error.vue'

import { TEXT_STYLES, getPnLVariant } from '../../../helpers/variant-helper.ts'

const api = new TradingApiService()
const {
  data: performance,
  loading,
  error,
  execute: retry,
} = useAsync(() => api.getPerformance())
</script>

<template>
  <Card>
    <template #header>
      <div class="flex items-center gap-2 text-white">
        <BarChart2 class="w-5 h-5 text-purple-400" />
        <h2 class="font-semibold text-lg">Performance Overview</h2>
      </div>
    </template>

    <div v-if="loading" class="grid grid-cols-2 gap-3">
      <Skeleton v-for="i in 4" :key="i" class="h-16 w-full" />
    </div>

    <Error
      v-else-if="error"
      message="Unable to load performance."
      retry
      @retry="retry"
    />

    <div v-else-if="performance" class="grid grid-cols-2 gap-3">
      <div
        class="border border-zinc-800 p-3 rounded-lg bg-zinc-900/50 flex flex-col justify-center"
      >
        <div class="flex items-center gap-1.5 text-zinc-400 mb-1">
          <DollarSign class="w-3.5 h-3.5" />
          <span class="text-xs font-medium uppercase tracking-wider">
            Total PnL
          </span>
        </div>
        <span
          class="font-mono text-lg font-bold"
          :class="TEXT_STYLES[getPnLVariant(performance.totalPnl)]"
        >
          {{ performance.totalPnl > 0 ? '+' : '' }}
          {{ formatCurrency(performance.totalPnl) }}
        </span>
      </div>

      <div
        class="border border-zinc-800 p-3 rounded-lg bg-zinc-900/50 flex flex-col justify-center"
      >
        <div class="flex items-center gap-1.5 text-zinc-400 mb-1">
          <Target class="w-3.5 h-3.5" />
          <span class="text-xs font-medium uppercase tracking-wider">
            Win Rate
          </span>
        </div>
        <span class="font-mono text-lg font-bold text-zinc-100">
          {{ formatPercentage(performance.winRate) }}
        </span>
      </div>

      <div
        class="border border-zinc-800 p-3 rounded-lg bg-zinc-900/50 flex flex-col justify-center"
      >
        <div class="flex items-center gap-1.5 text-zinc-400 mb-1">
          <Hash class="w-3.5 h-3.5" />
          <span class="text-xs font-medium uppercase tracking-wider">
            Trades
          </span>
        </div>
        <div class="flex items-baseline gap-2">
          <span class="font-mono text-lg font-bold text-zinc-100">
            {{ performance.totalTrades }}
          </span>
          <span class="text-xs text-emerald-400/80">
            {{ performance.winningTrades }}W
          </span>
          <span class="text-xs text-red-400/80">
            {{ performance.losingTrades }}L
          </span>
        </div>
      </div>

      <div
        class="border border-zinc-800 p-3 rounded-lg bg-zinc-900/50 flex flex-col justify-center"
      >
        <div class="flex items-center gap-1.5 text-zinc-400 mb-1">
          <Receipt class="w-3.5 h-3.5" />
          <span class="text-xs font-medium uppercase tracking-wider">
            Fees Paid
          </span>
        </div>
        <span class="font-mono text-lg font-bold text-zinc-400">
          {{ formatCurrency(performance.totalFees) }}
        </span>
      </div>
    </div>
  </Card>
</template>
