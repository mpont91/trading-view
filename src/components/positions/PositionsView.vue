<template>
  <div v-if="position">
    <div class="bg-neutral-800 shadow p-6 mb-6">
      <div
        v-if="!position.is_closed"
        class="flex items-center p-4 mb-4 text-sm border bg-transparent text-yellow-300 border-yellow-800"
        role="alert"
      >
        <Info class="flex-shrink-0 inline w-4 h-4 me-3" />
        <span class="sr-only">Info</span>
        <div>
          This positions is still open! No selling information available.
        </div>
      </div>
      <h2>Information</h2>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            ID:
            <span class="font-semibold">
              {{ position.id }}
            </span>
          </p>
        </div>
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            Pair:
            <span class="font-semibold">
              {{ position.pair }}
            </span>
          </p>
        </div>
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            Quantity:
            <span class="font-semibold">
              {{ formatNumber(position.quantity) }}
            </span>
          </p>
        </div>
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            Amount:
            <span class="font-semibold">
              {{ formatAmount(position.amount) }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="bg-neutral-800 shadow p-6 mb-6">
      <h2>Buying</h2>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            Price:
            <span class="font-semibold">
              $ {{ formatNumber(position.buy_price) }}
            </span>
          </p>
        </div>
        <div class="bg-yellow-950 text-yellow-300 p-4">
          <p>
            Commission:
            <span class="font-semibold">
              {{ formatNumber(position.buy_commission_quantity) }} BNB ($
              {{ formatNumber(position.buy_commission_amount) }})
            </span>
          </p>
        </div>
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            At:
            <span class="font-semibold">
              {{ formatDate(position.buy_at) }}
            </span>
          </p>
        </div>
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            Comment:
            <span class="font-semibold">
              {{ position.buy_comment }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div v-if="position.is_closed" class="bg-neutral-800 shadow p-6 mb-6">
      <h2>Selling</h2>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            Price:
            <span class="font-semibold">
              $ {{ formatNumber(position.sell_price) }}
            </span>
          </p>
        </div>
        <div class="bg-yellow-950 text-yellow-300 p-4">
          <p>
            Commission:
            <span class="font-semibold">
              {{ formatNumber(position.sell_commission_quantity) }} BNB ($
              {{ formatNumber(position.sell_commission_amount) }})
            </span>
          </p>
        </div>
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            At:
            <span class="font-semibold">
              {{ formatDate(position.sell_at) }}
            </span>
          </p>
        </div>
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            Comment:
            <span class="font-semibold">
              {{ position.sell_comment }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="bg-neutral-800 shadow p-6 mb-6">
      <h2>Profits</h2>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          v-if="position.is_closed"
          class="p-4"
          :class="{
            'bg-blue-950 text-blue-300': position.pnl! === 0,
            'bg-green-950 text-green-300': position.pnl! > 0,
            'bg-red-950 text-red-300': position.pnl! < 0,
          }"
        >
          <p>
            PnL:
            <span class="font-semibold">
              {{ formatAmount(position.pnl) }}
              ({{ formatPercentage(position.pnl_percentage) }})
            </span>
          </p>
        </div>
        <div
          v-else
          class="p-4"
          :class="{
            'bg-blue-950 text-blue-300': pnlLive(position) === 0,
            'bg-green-950 text-green-300': pnlLive(position) > 0,
            'bg-red-950 text-red-300': pnlLive(position) < 0,
          }"
        >
          <p>
            PnL (live):
            <span class="font-semibold">
              {{ formatAmount(pnlLive(position)) }}
              ({{ formatPercentage(pnlPercentageLive(position)) }})
            </span>
          </p>
        </div>
        <div class="bg-yellow-950 text-yellow-300 p-4">
          <p>
            Total commission:
            <span class="font-semibold">
              {{ formatNumber(position.total_commission_quantity) }} BNB ($
              {{ formatNumber(position.total_commission_amount) }})
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="bg-neutral-800 shadow p-6 mb-6">
      <h2>Monitoring</h2>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div class="bg-green-950 text-green-300 p-4">
          <p>
            Stop profit:
            <span class="font-semibold">
              $ {{ formatNumber(position.stop_profit) }}
            </span>
          </p>
        </div>
        <div class="bg-red-950 text-red-300 p-4">
          <p>
            Stop loss:
            <span class="font-semibold">
              $ {{ formatNumber(position.stop_loss) }}
            </span>
          </p>
        </div>
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            Trailing highest:
            <span v-if="position.is_trailing" class="font-semibold">
              $ {{ formatNumber(position.trailing_highest) }}
            </span>
            <span v-else class="font-semibold"> - </span>
          </p>
        </div>
        <div class="bg-blue-950 text-blue-300 p-4">
          <p>
            Trailing lowest:
            <span v-if="position.is_trailing" class="font-semibold">
              $ {{ formatNumber(position.trailing_lowest) }}
            </span>
            <span v-else class="font-semibold"> - </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  formatAmount,
  formatDate,
  formatNumber,
  formatPercentage,
} from '../../helpers/format-helper.ts'
import type { Position } from '../../models/position.ts'
import { onMounted } from 'vue'
import { getPairs, getPosition } from '../../api'
import { ref } from 'vue'
import Info from '../../icons/Info.vue'
import type { Pair } from '../../models/pair.ts'

const hasError = ref<boolean>(false)
const isLoading = ref<boolean>(true)
const position = ref<Position | null>(null)
const pairs = ref<Pair[]>([])

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
    if (!position.value.is_closed) {
      pairs.value = await getPairs()
    }
  } catch (error: unknown) {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

function getPair(pair: string) {
  return pairs.value.filter((p: Pair) => p.name === pair)[0]
}

function pnlLive(position: Position): number {
  const pair = getPair(position.pair)
  return (pair.price - position.buy_price) * position.quantity
}

function pnlPercentageLive(position: Position) {
  const pair = getPair(position.pair)
  return ((pair.price - position.buy_price) / position.buy_price) * 100
}
</script>
