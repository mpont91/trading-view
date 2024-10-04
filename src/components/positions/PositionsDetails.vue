<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div
      class="bg-neutral-600 p-5 shadow-lg max-w-lg w-full relative"
      @click.stop
    >
      <button
        @click="closeModal"
        class="absolute top-5 right-5 text-white hover:text-neutral-900"
      >
        <Close />
      </button>
      <h2 class="text-xl font-bold mb-4">Position details</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pair</th>
            <th>Quantity</th>
            <th>PnL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {{ position.id }}
            </td>
            <td>{{ position.pair }}</td>
            <td>{{ formatNumber(position.quantity) }}</td>
            <td>
              {{ formatAmount(position.pnl) }}
              ({{ formatPercentage(position.pnl_percentage) }})
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <th>Amount</th>
            <td class="text-right">{{ formatAmount(position.amount) }}</td>
          </tr>
          <tr>
            <th>Buy price</th>
            <td class="text-right">$ {{ formatNumber(position.buy_price) }}</td>
          </tr>
          <tr>
            <th>Buy commission</th>
            <td class="text-right">
              {{ formatNumber(position.buy_commission_quantity) }} BNB ($
              {{ formatNumber(position.buy_commission_amount) }})
            </td>
          </tr>
          <tr>
            <th>Buy comment</th>
            <td class="text-right">{{ position.buy_comment }}</td>
          </tr>
          <tr>
            <th>Buy at</th>
            <td class="text-right">{{ formatDate(position.buy_at) }}</td>
          </tr>
          <tr>
            <th>Stop profit / loss</th>
            <td class="text-right">
              $ {{ formatNumber(position.stop_profit) }} / $
              {{ formatNumber(position.stop_loss) }}
            </td>
          </tr>
          <tr>
            <th>Trailing highest / lowest</th>
            <td class="text-right">
              $ {{ formatNumber(position.trailing_highest) }} / $
              {{ formatNumber(position.trailing_lowest) }}
            </td>
          </tr>
          <tr>
            <th>Sell price</th>
            <td class="text-right">
              $ {{ formatNumber(position.sell_price) }}
            </td>
          </tr>
          <tr>
            <th>Sell commission</th>
            <td class="text-right">
              {{ formatNumber(position.sell_commission_quantity) }} BNB ($
              {{ formatNumber(position.sell_commission_amount) }})
            </td>
          </tr>
          <tr>
            <th>Sell comment</th>
            <td class="text-right">{{ position.sell_comment }}</td>
          </tr>
          <tr>
            <th>Sell at</th>
            <td class="text-right">{{ formatDate(position.sell_at) }}</td>
          </tr>
          <tr>
            <th>Total commission</th>
            <td class="text-right">
              {{ formatNumber(position.total_commission_quantity) }} BNB ($
              {{ formatNumber(position.total_commission_amount) }})
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  formatAmount,
  formatDate,
  formatNumber,
  formatPercentage,
} from '../../utils'
import type { PropType } from 'vue'
import type { Position } from '../../models/position.ts'
import Close from '../../icons/Close.vue'
import PositionsTableHeader from './PositionsTableHeader.vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  position: {
    type: Object as PropType<Position>,
    required: true,
  },
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}
</script>
