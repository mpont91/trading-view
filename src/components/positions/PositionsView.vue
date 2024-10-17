<template>
  <div v-if="position">
    <div class="bg-neutral-800 shadow p-6 mb-6">
      <h2>Information</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pair</th>
            <th>Quantity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {{ position.id }}
            </td>
            <td>{{ position.pair }}</td>
            <td>{{ formatNumber(position.quantity) }}</td>
            <td>{{ formatAmount(position.amount) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bg-neutral-800 shadow p-6 mb-6">
      <h2>Buying</h2>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Commission</th>
            <th>At</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$ {{ formatNumber(position.buy_price) }}</td>
            <td>
              {{ formatNumber(position.buy_commission_quantity) }} BNB ($
              {{ formatNumber(position.buy_commission_amount) }})
            </td>
            <td>{{ formatDate(position.buy_at) }}</td>
            <td>{{ position.buy_comment }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bg-neutral-800 shadow p-6 mb-6">
      <h2>Selling</h2>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Commission</th>
            <th>At</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span v-if="position.is_closed">
                $ {{ formatNumber(position.sell_price) }}
              </span>
            </td>
            <td>
              <span v-if="position.is_closed">
                {{ formatNumber(position.sell_commission_quantity) }} BNB ($
                {{ formatNumber(position.sell_commission_amount) }})
              </span>
            </td>
            <td>
              <span v-if="position.is_closed">
                {{ formatDate(position.sell_at) }}
              </span>
            </td>
            <td>
              <span v-if="position.is_closed">
                {{ position.sell_comment }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bg-neutral-800 shadow p-6 mb-6">
      <h2>Profits</h2>
      <table>
        <thead>
          <tr>
            <th>PnL</th>
            <th>Total commission</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span v-if="position.is_closed">
                {{ formatAmount(position.pnl) }}
                ({{ formatPercentage(position.pnl_percentage) }})
              </span>
            </td>
            <td>
              {{ formatNumber(position.total_commission_quantity) }} BNB ($
              {{ formatNumber(position.total_commission_amount) }})
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bg-neutral-800 shadow p-6 mb-6">
      <h2>Monitoring</h2>
      <table>
        <thead>
          <tr>
            <th>Stop profit</th>
            <th>Stop loss</th>
            <th>Trailing highest</th>
            <th>Trailing lowest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$ {{ formatNumber(position.stop_profit) }}</td>
            <td>$ {{ formatNumber(position.stop_loss) }}</td>
            <td>
              <span v-if="position.is_trailing">
                $ {{ formatNumber(position.trailing_highest) }}
              </span>
            </td>
            <td>
              <span v-if="position.is_trailing">
                $ {{ formatNumber(position.trailing_lowest) }}
              </span>
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
import type { Position } from '../../models/position.ts'
import { onMounted } from 'vue'
import { getPosition } from '../../api.ts'
import { ref } from 'vue'

const hasError = ref<boolean>(false)
const isLoading = ref<boolean>(true)
const position = ref<Position | null>(null)

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  await refresh()
})

async function refresh() {
  isLoading.value = true
  try {
    position.value = await getPosition(parseInt(props.id))
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>
