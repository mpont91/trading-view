<template>
  <div class="relative overflow-x-auto shadow-md">
    <table>
      <thead>
        <tr>
          <PositionsTableHeader
            v-for="field in fieldsMapping"
            :sort-field="sortField"
            :sort-order="sortOrder"
            :field-name="field.name"
            :field-value="field.value"
            @sort="sort(field.value)"
          />
        </tr>
      </thead>
      <tbody>
        <tr
          @click="openModal(position)"
          class="cursor-pointer hover:bg-neutral-800"
          :class="{
            'bg-green-950': position.pnl! >= 0,
            'bg-red-950': position.pnl! < 0,
          }"
          v-for="position in positions"
        >
          <td>
            {{ position.id }}
          </td>
          <td>{{ position.pair }}</td>
          <td class="text-right">{{ formatAmount(position.amount) }}</td>
          <td class="text-right">$ {{ formatNumber(position.buy_price) }}</td>
          <td class="text-right">{{ formatDate(position.buy_at) }}</td>
          <td class="text-right">$ {{ formatNumber(position.sell_price) }}</td>
          <td class="text-right">{{ formatDate(position.sell_at) }}</td>
          <td class="text-right">{{ formatAmount(position.pnl) }}</td>
          <td class="text-right">
            {{ formatPercentage(position.pnl_percentage) }}
          </td>
        </tr>
      </tbody>
    </table>
    <PositionsDetails
      :isOpen="isModalOpen"
      :position="selectedPosition"
      @close="closeModal"
    />
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PositionsTableHeader from './PositionsTableHeader.vue'
import type { PropType } from 'vue'
import type { Position } from '../../models/position.ts'
import {
  formatAmount,
  formatDate,
  formatNumber,
  formatPercentage,
} from '../../utils.ts'
import PositionsDetails from './PositionsDetails.vue'

defineProps({
  positions: {
    type: Array as PropType<Position[]>,
    default: () => [],
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

const fieldsMapping: { name: string; value: string }[] = [
  { name: 'id', value: 'id' },
  { name: 'pair', value: 'pair' },
  { name: 'amount $', value: 'amount' },
  { name: 'buy price $', value: 'buy_price' },
  { name: 'buy at', value: 'buy_at' },
  { name: 'sell price $', value: 'sell_price' },
  { name: 'sell at', value: 'sell_at' },
  { name: 'pnl $', value: 'pnl' },
  { name: 'pnl %', value: 'pnl_percentage' },
]

const isModalOpen = ref(false)
const selectedPosition = ref<Position | null>(null)

function openModal(position: Position) {
  selectedPosition.value = position
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

function sort(field: string) {
  emit('sort', field)
}
</script>
