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
          @click="showPositionLink(position)"
          class="cursor-pointer hover:bg-neutral-800"
          :class="pnlClass(pnlLive(position, pairs))"
          v-for="position in positions"
        >
          <td>{{ position.id }}</td>
          <td>{{ position.pair }}</td>
          <td class="text-right">{{ formatAmount(position.amount) }}</td>
          <td class="text-right">
            {{ fiatCurrency }} {{ formatNumber(position.buy_price) }}
          </td>
          <td class="text-right">{{ formatDate(position.buy_at) }}</td>
          <td class="text-right">
            {{ formatAmount(pnlLive(position, pairs)) }}
          </td>
          <td class="text-right">
            {{ formatPercentage(pnlPercentageLive(position, pairs)) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { Position } from '../../models/position.ts'
import type { Pair } from '../../models/pair.ts'
import {
  formatAmount,
  formatDate,
  formatNumber,
  formatPercentage,
} from '../../helpers/format-helper.ts'
import {
  fiatCurrency,
  pnlLive,
  pnlPercentageLive,
} from '../../helpers/pairs-helper.ts'
import { pnlClass, showPositionLink } from '../../helpers/position-helper.ts'

defineProps({
  positions: {
    type: Array as PropType<Position[]>,
    default: () => [],
  },
  pairs: {
    type: Array as PropType<Pair[]>,
    default: () => [],
  },
})
</script>
