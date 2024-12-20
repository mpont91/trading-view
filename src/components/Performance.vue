<template>
  <Card>
    <h2>Performance</h2>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-6">
      <div class="bg-sky-950 text-sky-300 p-4">
        <p>
          Total trades:
          <span class="font-semibold">{{ performance.trades }}</span>
        </p>
      </div>
      <div class="bg-emerald-950 text-emerald-300 p-4">
        <p>
          Successful trades:
          <span class="font-semibold">{{ performance.success }}</span>
        </p>
      </div>
      <div class="bg-rose-950 text-rose-300 p-4">
        <p>
          Failed trades:
          <span class="font-semibold">{{ performance.failed }}</span>
        </p>
      </div>
      <div
        class="p-4"
        :class="{
          'bg-emerald-950 text-emerald-300': performance.net >= 0,
          'bg-rose-950 text-rose-300': performance.net < 0,
        }"
      >
        <p>
          PnL:
          <span class="font-semibold">
            {{ formatAmount(performance.pnl) }}
          </span>
        </p>
      </div>
      <div class="bg-amber-950 text-amber-300 p-4">
        <p>
          Commissions:
          <span class="font-semibold">
            {{ formatAmount(performance.fees) }}
          </span>
        </p>
      </div>
      <div
        class="p-4"
        :class="{
          'bg-emerald-950 text-emerald-300': performance.net >= 0,
          'bg-rose-950 text-rose-300': performance.net < 0,
        }"
      >
        <p>
          Net profit:
          <span class="font-semibold">
            {{ formatAmount(performance.net) }}
          </span>
        </p>
      </div>
    </div>
  </Card>
</template>
<script setup lang="ts">
import type { Performance } from '../types/performance.ts'
import type { PropType } from 'vue'
import Card from './Card.vue'
import { formatAmount } from '../helpers/format-helper.ts'

defineProps({
  performance: {
    type: Object as PropType<Performance>,
    default: {
      trades: 0,
      success: 0,
      failed: 0,
      pnl: 0,
      fees: 0,
      net: 0,
    },
  },
})
</script>
