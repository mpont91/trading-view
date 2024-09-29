<template>
  <div class="bg-neutral-800 rounded-lg shadow p-6 mb-6">
    <h2>Performance summary</h2>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <div class="bg-green-950 text-green-300 p-4 rounded-lg">
        <p>
          Total trades:
          <span class="font-semibold">{{ performance.total_trades }}</span>
        </p>
      </div>
      <div class="bg-green-950 text-green-300 p-4 rounded-lg">
        <p>
          Successful trades:
          <span class="font-semibold">{{ performance.successful_trades }}</span>
        </p>
      </div>
      <div class="bg-red-950 text-red-300 p-4 rounded-lg">
        <p>
          Failed trades:
          <span class="font-semibold">{{ performance.failed_trades }}</span>
        </p>
      </div>
      <div class="bg-blue-950 text-blue-300 p-4 rounded-lg">
        <p>
          PnL:
          <span class="font-semibold">
            {{ formatAmount(performance.total_pnl) }}
          </span>
          ({{ formatPercentage(performance.total_pnl_percentage) }})
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div v-if="performance.best_performing_pair">
        <h3 class="text-lg font-semibold mt-4">Best performing market</h3>
        <div class="bg-green-950 text-green-300 p-4 rounded-lg mt-2">
          <p>
            Pair:
            <span class="font-semibold">
              {{ performance.best_performing_pair.pair }}
            </span>
          </p>
          <p>
            Trades:
            <span class="font-semibold">
              {{ performance.best_performing_pair.trades }}
            </span>
          </p>
          <p>
            PnL:
            <span class="font-semibold">
              {{ formatAmount(performance.best_performing_pair.pnl) }}
            </span>
            ({{
              formatPercentage(performance.best_performing_pair.pnl_percentage)
            }})
          </p>
        </div>
      </div>
      <div v-if="performance.worst_performing_pair">
        <h3 class="text-lg font-semibold mt-4">Worst performing pair</h3>
        <div class="bg-red-950 text-red-300 p-4 rounded-lg mt-2">
          <p>
            Pair:
            <span class="font-semibold">
              {{ performance.worst_performing_pair.pair }}
            </span>
          </p>
          <p>
            Trades:
            <span class="font-semibold">
              {{ performance.worst_performing_pair.trades }}
            </span>
          </p>
          <p>
            PnL:
            <span class="font-semibold">
              {{ formatAmount(performance.worst_performing_pair.pnl) }}
            </span>
            ({{
              formatPercentage(
                performance.worst_performing_pair.pnl_percentage,
              )
            }})
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatAmount, formatPercentage } from '../../utils.ts'
import type { PropType } from 'vue'
import type { DashboardPerformance } from '../../models/dashboard.ts'

defineProps({
  performance: {
    type: Object as PropType<DashboardPerformance>,
    required: true,
  },
})
</script>
