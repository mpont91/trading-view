<template>
  <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
    <thead class="text-xs uppercase dark:bg-neutral-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Pair</th>
        <th scope="col" class="px-6 py-3">Quantity</th>
        <th scope="col" class="px-6 py-3">Amount</th>
        <th scope="col" class="px-6 py-3">Buy price</th>
        <th scope="col" class="px-6 py-3">Buy at</th>
        <th scope="col" class="px-6 py-3">Stop profit/loss</th>
        <th scope="col" class="px-6 py-3">Trailing highest/lowest</th>
        <th scope="col" class="px-6 py-3">Sell price</th>
        <th scope="col" class="px-6 py-3">Sell at</th>
        <th scope="col" class="px-6 py-3">PnL</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="position in positions"
        :class="{
          'bg-green-950': position.is_closed && position.pnl >= 0,
          'bg-red-950': position.is_closed && position.pnl < 0,
          'bg-green-900': !position.is_closed && pnlLive(position) >= 0,
          'bg-red-900': !position.is_closed && pnlLive(position) < 0,
        }"
        class="border-b dark:border-gray-700"
      >
        <td class="px-6 py-4 dark:text-white">{{ position.pair }}</td>
        <td class="px-6 py-4 dark:text-white">{{ position.quantity }}</td>
        <td class="px-6 py-4 dark:text-white">
          {{ formatNumber(position.amount) }}
        </td>
        <td class="px-6 py-4 dark:text-white">
          {{ formatNumber(position.buy_price) }}
        </td>
        <td class="px-6 py-4 dark:text-white">
          {{ formatDate(position.buy_at) }}
        </td>
        <td class="px-6 py-4 dark:text-white text-nowrap">
          {{ formatNumber(position.stop_profit) }} /
          {{ formatNumber(position.stop_loss) }}
        </td>
        <td class="px-6 py-4 dark:text-white text-nowrap">
          <span v-if="position.trailing_highest && position.trailing_lowest">
            {{ formatNumber(position.trailing_highest) }} /
            {{ formatNumber(position.trailing_lowest) }}
          </span>
        </td>
        <td class="px-6 py-4 dark:text-white">
          {{ formatNumber(position.sell_price) }}
        </td>
        <td class="px-6 py-4 dark:text-white">
          {{ formatDate(position.sell_at) }}
        </td>
        <td class="px-6 py-4 dark:text-white text-nowrap">
          {{
            formatAmount(position.is_closed ? position.pnl : pnlLive(position))
          }}
          ({{
            formatPercentage(
              position.is_closed
                ? position.pnl_percentage
                : pnlPercentageLive(position),
            )
          }})
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import {
  formatAmount,
  formatDate,
  formatNumber,
  formatPercentage,
} from '../utils.ts'
import type { Market, Position } from '../types.ts'
import type { PropType } from 'vue'

const props = defineProps({
  positions: {
    type: Array as PropType<Position[]>,
    default: () => [],
  },
  markets: {
    type: Array as PropType<Market[]>,
    default: () => [],
  },
})

function getMarket(pair: string) {
  return props.markets.filter((market) => market.pair === pair)[0]
}

function pnlLive(position: Position): number {
  const market = getMarket(position.pair)
  return (market.price - position.buy_price) * position.quantity
}

function pnlPercentageLive(position: Position) {
  const market = getMarket(position.pair)
  return ((market.price - position.buy_price) / position.buy_price) * 100
}
</script>
