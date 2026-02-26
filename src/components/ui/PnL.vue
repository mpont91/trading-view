<script setup lang="ts">
import { TrendingUp, TrendingDown } from 'lucide-vue-next'
import { formatCurrency, formatPercentage } from '../../helpers/format-helper'
import { TEXT_STYLES, getPnLVariant } from '../../helpers/variant-helper'
import Skeleton from './Skeleton.vue'

withDefaults(
  defineProps<{
    pnl?: number | null
    pnlPercent?: number | null
    lg?: boolean
    align?: 'left' | 'right'
  }>(),
  {
    align: 'right',
  },
)
</script>

<template>
  <div
    class="flex flex-col"
    :class="align === 'right' ? 'items-end' : 'items-start'"
  >
    <template v-if="pnl == null || pnlPercent == null">
      <Skeleton :class="['w-20', lg ? 'h-5 mb-1.5' : 'h-4 mb-1.5']" />
      <Skeleton class="h-5 w-16" />
    </template>

    <template v-else>
      <div
        class="flex flex-col items-end"
        :class="TEXT_STYLES[getPnLVariant(pnl)]"
      >
        <span
          class="font-bold font-mono"
          :class="{ 'text-lg leading-none mb-1': lg }"
        >
          {{ pnl > 0 ? '+' : '' }}{{ formatCurrency(pnl) }}
        </span>

        <div
          class="flex items-center gap-1 text-xs bg-zinc-900/50 px-1.5 py-0.5 rounded"
        >
          <TrendingUp v-if="pnl > 0" class="w-3 h-3" />
          <TrendingDown v-else class="w-3 h-3" />
          {{ formatPercentage(pnlPercent) }}
        </div>
      </div>
    </template>
  </div>
</template>
