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
          @click="showPositionLink(position)"
          class="cursor-pointer hover:bg-neutral-800"
          :class="pnlClass(position.pnl!)"
          v-for="position in positions"
        >
          <td>
            {{ position.id }}
          </td>
          <td>{{ position.pair }}</td>
          <td class="text-right">{{ formatAmount(position.amount) }}</td>
          <td class="text-right">
            {{ fiatCurrency }} {{ formatNumber(position.buy_price) }}
          </td>
          <td class="text-right">{{ formatDate(position.buy_at) }}</td>
          <td class="text-right">
            {{ fiatCurrency }} {{ formatNumber(position.sell_price) }}
          </td>
          <td class="text-right">{{ formatDate(position.sell_at) }}</td>
          <td class="text-right">{{ formatAmount(position.pnl) }}</td>
          <td class="text-right">
            {{ formatPercentage(position.pnl_percentage) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import PositionsTableHeader from './PositionsTableHeader.vue'
import type { PropType } from 'vue'
import type { Position } from '../../models/position.ts'
import {
  formatAmount,
  formatDate,
  formatNumber,
  formatPercentage,
} from '../../helpers/format-helper.ts'
import { fiatCurrency } from '../../helpers/pairs-helper.ts'
import {
  fieldsMapping,
  pnlClass,
  showPositionLink,
} from '../../helpers/position-helper.ts'

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

function sort(field: string) {
  emit('sort', field)
}
</script>
