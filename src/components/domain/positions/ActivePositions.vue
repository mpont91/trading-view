<script setup lang="ts">
import { ref } from 'vue'
import { Briefcase, TrendingUp, TrendingDown } from 'lucide-vue-next'

import { useLivePositions } from '../../../composables/use-live-positions.ts'
import type { PositionFilter } from '../../../filters/position-filter.ts'

import Card from '../../ui/Card.vue'
import Skeleton from '../../ui/Skeleton.vue'
import Error from '../../ui/Error.vue'

import {
  formatCurrency,
  formatPercentage,
  formatQuantity,
  formatDate,
  formatTime,
} from '../../../helpers/format-helper.ts'
import { getSymbolLabel } from '../../../helpers/symbol-helper.ts'
import {
  PANEL_STYLES,
  TEXT_STYLES,
  getPnLVariant,
} from '../../../helpers/variant-helper.ts'
import PnL from '../../ui/PnL.vue'

const filter = ref<PositionFilter>({
  page: 1,
  limit: 10,
  status: 'OPEN',
})

const { data: openPositions, loading, error, retry } = useLivePositions(filter)
</script>

<template>
  <Card>
    <template #header>
      <div class="flex items-center gap-2 text-white">
        <Briefcase class="w-5 h-5 text-blue-400" />
        <h2>Active Positions</h2>
      </div>
    </template>

    <div v-if="loading" class="flex flex-col gap-3">
      <Skeleton class="h-16 w-full" />
      <Skeleton class="h-16 w-full" />
    </div>

    <Error
      v-else-if="error"
      message="Unable to load active positions."
      retry
      @retry="retry"
    />

    <div
      v-else-if="!openPositions?.data || openPositions.data.length === 0"
      class="flex flex-col items-center justify-center py-8 text-zinc-500 border border-dashed border-zinc-800 rounded-lg"
    >
      <Briefcase class="w-8 h-8 mb-2 opacity-50" />
      <p class="text-sm">No active positions right now.</p>
    </div>

    <div v-else class="flex flex-col gap-3">
      <div
        v-for="item in openPositions.data"
        :key="item.id"
        class="flex items-center justify-between p-4 border border-zinc-800 rounded-lg bg-zinc-900/30 hover:bg-zinc-800/50 transition-colors"
      >
        <div class="flex flex-col">
          <span class="font-bold text-lg text-zinc-100">
            {{ getSymbolLabel(item.symbol) }}
          </span>
          <span class="text-xs text-zinc-500">
            {{ formatDate(item.entryTime) }} · {{ formatTime(item.entryTime) }}
          </span>
        </div>

        <div class="hidden sm:flex flex-col items-end">
          <span class="font-mono text-zinc-300">
            {{ formatQuantity(item.quantity) }}
          </span>
          <span class="text-xs text-zinc-500 font-mono">
            @ {{ formatCurrency(item.entryPrice) }}
          </span>
        </div>

        <div class="flex flex-col items-end min-w-25">
          <PnL :pnl="item.pnl" :pnl-percent="item.pnlPercent" lg />
        </div>
      </div>
    </div>
  </Card>
</template>
