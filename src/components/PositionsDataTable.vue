<template>
  <table class="w-full text-sm text-left rtl:text-right dark:text-gray-400">
    <thead class="text-xs uppercase dark:bg-neutral-700 dark:text-gray-400">
      <tr>
        <th
          v-if="isVisible('id') && canSort"
          scope="col"
          class="px-6 py-3 cursor-pointer"
        >
          <div class="flex items-center" @click="sort('id')">
            ID
            <SortIndicators
              field="id"
              :sort-field="sortField"
              :sort-order="sortOrder"
            />
          </div>
        </th>
        <th v-else-if="isVisible('id')" scope="col" class="px-6 py-3">ID</th>
        <th v-if="isVisible('pair')" scope="col" class="px-6 py-3">Pair</th>
        <th
          v-if="isVisible('quantity') && canSort"
          scope="col"
          class="px-6 py-3 cursor-pointer"
        >
          <div class="flex items-center" @click="sort('quantity')">
            Quantity
            <SortIndicators
              field="quantity"
              :sort-field="sortField"
              :sort-order="sortOrder"
            />
          </div>
        </th>
        <th v-else-if="isVisible('quantity')" scope="col" class="px-6 py-3">
          Quantity
        </th>
        <th
          v-if="isVisible('amount') && canSort"
          scope="col"
          class="px-6 py-3 cursor-pointer"
        >
          <div class="flex items-center" @click="sort('amount')">
            Amount
            <SortIndicators
              field="amount"
              :sort-field="sortField"
              :sort-order="sortOrder"
            />
          </div>
        </th>
        <th v-else-if="isVisible('amount')" scope="col" class="px-6 py-3">
          Amount
        </th>
        <th
          v-if="isVisible('buy_price') && canSort"
          scope="col"
          class="px-6 py-3 cursor-pointer"
        >
          <div class="flex items-center" @click="sort('buy_price')">
            Buy price
            <SortIndicators
              field="buy_price"
              :sort-field="sortField"
              :sort-order="sortOrder"
            />
          </div>
        </th>
        <th v-else-if="isVisible('buy_price')" scope="col" class="px-6 py-3">
          Buy price
        </th>
        <th
          v-if="isVisible('buy_at') && canSort"
          scope="col"
          class="px-6 py-3 cursor-pointer"
        >
          <div class="flex items-center" @click="sort('buy_at')">
            Buy at
            <SortIndicators
              field="buy_at"
              :sort-field="sortField"
              :sort-order="sortOrder"
            />
          </div>
        </th>
        <th v-else-if="isVisible('buy_at')" scope="col" class="px-6 py-3">
          Buy at
        </th>
        <th v-if="isVisible('stop_profit_loss')" scope="col" class="px-6 py-3">
          Stop profit/loss
        </th>
        <th v-if="isVisible('trailing')" scope="col" class="px-6 py-3">
          Trailing highest/lowest
        </th>
        <th
          v-if="isVisible('sell_price') && canSort"
          scope="col"
          class="px-6 py-3 cursor-pointer"
        >
          <div class="flex items-center" @click="sort('sell_price')">
            Sell price
            <SortIndicators
              field="sell_price"
              :sort-field="sortField"
              :sort-order="sortOrder"
            />
          </div>
        </th>
        <th v-else-if="isVisible('sell_price')" scope="col" class="px-6 py-3">
          Sell price
        </th>
        <th
          v-if="isVisible('sell_at') && canSort"
          scope="col"
          class="px-6 py-3 cursor-pointer"
        >
          <div class="flex items-center" @click="sort('sell_at')">
            Sell at
            <SortIndicators
              field="sell_at"
              :sort-field="sortField"
              :sort-order="sortOrder"
            />
          </div>
        </th>
        <th v-else-if="isVisible('sell_at')" scope="col" class="px-6 py-3">
          Sell at
        </th>
        <th
          v-if="isVisible('pnl') && canSort"
          scope="col"
          class="px-6 py-3 cursor-pointer"
        >
          <div class="flex items-center" @click="sort('pnl_percentage')">
            PnL
            <SortIndicators
              field="pnl_percentage"
              :sort-field="sortField"
              :sort-order="sortOrder"
            />
          </div>
        </th>
        <th v-else-if="isVisible('pnl')" scope="col" class="px-6 py-3">PnL</th>
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
        <td v-if="isVisible('id')" class="px-6 py-4 dark:text-white">
          {{ position.id }}
        </td>
        <td v-if="isVisible('pair')" class="px-6 py-4 dark:text-white">
          {{ position.pair }}
        </td>
        <td v-if="isVisible('quantity')" class="px-6 py-4 dark:text-white">
          {{ position.quantity }}
        </td>
        <td v-if="isVisible('amount')" class="px-6 py-4 dark:text-white">
          {{ formatNumber(position.amount) }}
        </td>
        <td v-if="isVisible('buy_price')" class="px-6 py-4 dark:text-white">
          {{ formatNumber(position.buy_price) }}
        </td>
        <td v-if="isVisible('buy_at')" class="px-6 py-4 dark:text-white">
          {{ formatDate(position.buy_at) }}
        </td>
        <td
          v-if="isVisible('stop_profit_loss')"
          class="px-6 py-4 dark:text-white text-nowrap"
        >
          {{ formatNumber(position.stop_profit) }} /
          {{ formatNumber(position.stop_loss) }}
        </td>
        <td
          v-if="isVisible('trailing')"
          class="px-6 py-4 dark:text-white text-nowrap"
        >
          <span v-if="position.trailing_highest && position.trailing_lowest">
            {{ formatNumber(position.trailing_highest) }} /
            {{ formatNumber(position.trailing_lowest) }}
          </span>
        </td>
        <td v-if="isVisible('sell_price')" class="px-6 py-4 dark:text-white">
          {{ formatNumber(position.sell_price) }}
        </td>
        <td v-if="isVisible('sell_at')" class="px-6 py-4 dark:text-white">
          {{ formatDate(position.sell_at) }}
        </td>
        <td
          v-if="isVisible('pnl')"
          class="px-6 py-4 dark:text-white text-nowrap"
        >
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
import type { PropType } from 'vue'
import {
  formatAmount,
  formatDate,
  formatNumber,
  formatPercentage,
} from '../utils.ts'
import type { Market, Position } from '../types.ts'
import SortIndicators from './SortIndicators.vue'

const props = defineProps({
  positions: {
    type: Array as PropType<Position[]>,
    default: () => [],
  },
  markets: {
    type: Array as PropType<Market[]>,
    default: () => [],
  },
  fields: {
    type: Array as PropType<string[]>,
    default: () => [],
    required: true,
  },
  canSort: {
    type: Boolean,
    default: false,
  },
  sortField: {
    type: String,
    default: 'id',
  },
  sortOrder: {
    type: String as PropType<'asc' | 'desc'>,
    default: 'desc',
  },
})

const emit = defineEmits(['sort'])

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

function sort(field: string) {
  emit('sort', field)
}

function isVisible(field: string) {
  return props.fields.includes(field)
}
</script>
