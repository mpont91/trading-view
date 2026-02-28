<script setup lang="ts">
import { Wallet, Coins, PieChart } from 'lucide-vue-next'
import { TradingApiService } from '../../../services/trading-api-service.ts'
import { useAsync } from '../../../composables/use-async.ts'
import {
  formatCurrency,
  formatQuantity,
} from '../../../helpers/format-helper.ts'

import Card from '../../ui/Card.vue'
import Skeleton from '../../ui/Skeleton.vue'
import Error from '../../ui/Error.vue'

const api = new TradingApiService()

const {
  data: portfolio,
  loading,
  error,
  execute: retry,
} = useAsync(() => api.getPortfolio())
</script>

<template>
  <Card>
    <template #header>
      <div class="flex items-center gap-2 text-white">
        <PieChart class="w-5 h-5 text-emerald-400" />
        <h2 class="font-semibold text-lg">Portfolio</h2>
      </div>
    </template>
    <div
      v-if="loading && !portfolio"
      class="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <Skeleton class="h-24 w-full" />
      <Skeleton class="h-24 w-full" />
    </div>

    <Error
      v-else-if="error && !portfolio"
      message="Unable to load portfolio data."
      retry
      @retry="retry"
    />

    <div v-else-if="portfolio" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        class="flex flex-col p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50"
      >
        <div class="flex items-center gap-2 mb-2">
          <Wallet class="w-4 h-4 text-emerald-400" />
          <span
            class="text-xs font-bold uppercase tracking-wider text-emerald-400/70"
          >
            Total Equity
          </span>
        </div>
        <span class="text-3xl font-mono font-bold text-white">
          {{ formatCurrency(portfolio.equity, 2) }}
        </span>
      </div>

      <div
        class="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50"
      >
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <Coins class="w-4 h-4 text-amber-400" />
            <span
              class="text-xs font-bold uppercase tracking-wider text-amber-400/70"
            >
              BNB Balance
            </span>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-mono font-bold text-white">
              {{ formatQuantity(portfolio.bnb) }}
            </span>
            <span class="text-sm font-medium text-zinc-500">BNB</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
