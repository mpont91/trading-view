<template>
  <div class="relative overflow-x-auto shadow-md">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Pair</th>
          <th class="text-right">Amount</th>
          <th class="text-right">Buy price</th>
          <th class="text-right">Buy at</th>
          <th class="text-right">Pnl</th>
          <th class="text-right">Pnl %</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :class="{
            'bg-green-950': pnlLive(position) >= 0,
            'bg-red-950': pnlLive(position) < 0,
          }"
          v-for="position in positions"
        >
          <td>{{ position.id }}</td>
          <td>{{ position.pair }}</td>
          <td class="text-right">{{ formatAmount(position.amount) }}</td>
          <td class="text-right">{{ formatAmount(position.buy_price) }}</td>
          <td class="text-right">{{ formatDate(position.buy_at) }}</td>
          <td class="text-right">{{ formatAmount(pnlLive(position)) }}</td>
          <td class="text-right">
            {{ formatPercentage(pnlPercentageLive(position)) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Position } from '../../models/position.ts'
import type { Market } from '../../models/market.ts'
import { formatAmount, formatDate, formatPercentage } from '../../utils.ts'

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
  return props.markets.filter((market: Market) => market.pair === pair)[0]
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
