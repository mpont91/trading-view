<template>
  <div class="relative overflow-x-auto shadow-md">
    <table>
      <thead>
        <tr>
          <th v-if="isVisible('id') && canSort" class="cursor-pointer">
            <div class="flex items-center" @click="sort('id')">
              ID
              <SortIndicators
                field="id"
                :sort-field="sortField"
                :sort-order="sortOrder"
              />
            </div>
          </th>
          <th v-else-if="isVisible('id')">ID</th>
          <th v-if="isVisible('pair')">Pair</th>
          <th v-if="isVisible('quantity') && canSort" class="cursor-pointer">
            <div class="flex items-center" @click="sort('quantity')">
              Quantity
              <SortIndicators
                field="quantity"
                :sort-field="sortField"
                :sort-order="sortOrder"
              />
            </div>
          </th>
          <th v-else-if="isVisible('quantity')">Quantity</th>
          <th v-if="isVisible('amount') && canSort" class="cursor-pointer">
            <div class="flex items-center" @click="sort('amount')">
              Amount
              <SortIndicators
                field="amount"
                :sort-field="sortField"
                :sort-order="sortOrder"
              />
            </div>
          </th>
          <th v-else-if="isVisible('amount')">Amount</th>
          <th v-if="isVisible('buy_price') && canSort" class="cursor-pointer">
            <div class="flex items-center" @click="sort('buy_price')">
              Buy price
              <SortIndicators
                field="buy_price"
                :sort-field="sortField"
                :sort-order="sortOrder"
              />
            </div>
          </th>
          <th v-else-if="isVisible('buy_price')">Buy price</th>
          <th v-if="isVisible('buy_at') && canSort" class="cursor-pointer">
            <div class="flex items-center" @click="sort('buy_at')">
              Buy at
              <SortIndicators
                field="buy_at"
                :sort-field="sortField"
                :sort-order="sortOrder"
              />
            </div>
          </th>
          <th v-else-if="isVisible('buy_at')">Buy at</th>
          <th v-if="isVisible('stop_profit_loss')">Stop profit/loss</th>
          <th v-if="isVisible('trailing')">Trailing highest/lowest</th>
          <th v-if="isVisible('sell_price') && canSort" class="cursor-pointer">
            <div class="flex items-center" @click="sort('sell_price')">
              Sell price
              <SortIndicators
                field="sell_price"
                :sort-field="sortField"
                :sort-order="sortOrder"
              />
            </div>
          </th>
          <th v-else-if="isVisible('sell_price')">Sell price</th>
          <th v-if="isVisible('sell_at') && canSort" class="cursor-pointer">
            <div class="flex items-center" @click="sort('sell_at')">
              Sell at
              <SortIndicators
                field="sell_at"
                :sort-field="sortField"
                :sort-order="sortOrder"
              />
            </div>
          </th>
          <th v-else-if="isVisible('sell_at')">Sell at</th>
          <th v-if="isVisible('pnl') && canSort" class="cursor-pointer">
            <div class="flex items-center" @click="sort('pnl_percentage')">
              PnL
              <SortIndicators
                field="pnl_percentage"
                :sort-field="sortField"
                :sort-order="sortOrder"
              />
            </div>
          </th>
          <th v-else-if="isVisible('pnl')">PnL</th>
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
        >
          <td v-if="isVisible('id')">
            {{ position.id }}
          </td>
          <td v-if="isVisible('pair')">
            {{ position.pair }}
          </td>
          <td v-if="isVisible('quantity')">
            {{ position.quantity }}
          </td>
          <td v-if="isVisible('amount')">
            {{ formatNumber(position.amount) }}
          </td>
          <td v-if="isVisible('buy_price')">
            {{ formatNumber(position.buy_price) }}
          </td>
          <td v-if="isVisible('buy_at')">
            {{ formatDate(position.buy_at) }}
          </td>
          <td v-if="isVisible('stop_profit_loss')" class="text-nowrap">
            {{ formatNumber(position.stop_profit) }} /
            {{ formatNumber(position.stop_loss) }}
          </td>
          <td v-if="isVisible('trailing')" class="text-nowrap">
            <span v-if="position.trailing_highest && position.trailing_lowest">
              {{ formatNumber(position.trailing_highest) }} /
              {{ formatNumber(position.trailing_lowest) }}
            </span>
          </td>
          <td v-if="isVisible('sell_price')">
            {{ formatNumber(position.sell_price) }}
          </td>
          <td v-if="isVisible('sell_at')">
            {{ formatDate(position.sell_at) }}
          </td>
          <td v-if="isVisible('pnl')" class="text-nowrap">
            {{
              formatAmount(
                position.is_closed ? position.pnl : pnlLive(position),
              )
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
  </div>
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
