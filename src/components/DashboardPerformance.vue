<template>
  <div class="bg-neutral-800 rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold mb-4">Performance summary</h2>
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-green-900 text-green-300 p-4 rounded-lg">
        <p>
          Total trades: <span class="font-semibold">{{ totalTrades }}</span>
        </p>
      </div>
      <div class="bg-green-900 text-green-300 p-4 rounded-lg">
        <p>
          Successful trades:
          <span class="font-semibold">{{ successfulTrades }}</span>
        </p>
      </div>
      <div class="bg-red-900 text-red-300 p-4 rounded-lg">
        <p>
          Failed trades: <span class="font-semibold">{{ failedTrades }}</span>
        </p>
      </div>
      <div class="bg-blue-900 text-blue-300 p-4 rounded-lg">
        <p>
          Total PnL:
          <span class="font-semibold"> {{ formatAmount(pnl) }} </span> -
          {{ formatPercentage(pnlPercentage) }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h3 class="text-lg font-semibold mt-4">Best performing pair</h3>
        <div class="bg-green-900 text-green-300 p-4 rounded-lg mt-2">
          <p>
            Pair: <span class="font-semibold">{{ bestPerformingPair }}</span>
          </p>
          <p>
            PnL:
            <span class="font-semibold">{{
              formatAmount(bestPerformingPnl)
            }}</span>
            -
            {{ formatPercentage(bestPerformingPnlPercentage) }}
          </p>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-semibold mt-4">Worst performing pair</h3>
        <div class="bg-red-900 text-red-300 p-4 rounded-lg mt-2">
          <p>
            Pair: <span class="font-semibold">{{ worstPerformingPair }}</span>
          </p>
          <p>
            PnL:
            <span class="font-semibold">{{
              formatAmount(worstPerformingPnl)
            }}</span>
            -
            {{ formatPercentage(worstPerformingPnlPercentage) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatAmount, formatPercentage } from '../utils.ts'

defineProps({
  totalTrades: {
    type: Number,
    default: 0,
  },
  successfulTrades: {
    type: Number,
    default: 0,
  },
  failedTrades: {
    type: Number,
    default: 0,
  },
  pnl: {
    type: Number,
    default: 0,
  },
  pnlPercentage: {
    type: Number,
    default: 0,
  },
  bestPerformingPair: {
    type: String,
    default: '',
  },
  bestPerformingPnl: {
    type: Number,
    default: 0,
  },
  bestPerformingPnlPercentage: {
    type: Number,
    default: 0,
  },
  worstPerformingPair: {
    type: String,
    default: '',
  },
  worstPerformingPnl: {
    type: Number,
    default: 0,
  },
  worstPerformingPnlPercentage: {
    type: Number,
    default: 0,
  },
})
</script>
