<template>
  <Card title="Trailing">
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-neutral-400">
        <thead class="text-xs uppercase bg-neutral-700 text-neutral-400">
          <tr>
            <th scope="col" class="px-6 py-3">Symbol</th>
            <th scope="col" class="px-6 py-3">Take profit</th>
            <th scope="col" class="px-6 py-3">Stop loss</th>
            <th scope="col" class="px-6 py-3">Trailing stop</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in trailing"
            class="border-b bg-neutral-800 border-neutral-700"
          >
            <td class="px-6 py-4">{{ item.symbol }}</td>
            <td class="px-6 py-4">
              {{ formatAmount(item.tpPrice) }} ({{ formatPercentage(item.tp) }})
            </td>
            <td class="px-6 py-4">
              {{ formatAmount(item.slPrice) }} ({{ formatPercentage(item.sl) }})
            </td>
            <td class="px-6 py-4">
              {{ formatAmount(item.tsPrice) }} ({{ formatPercentage(item.ts) }})
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from '../common/Card.vue'
import type { PropType } from 'vue'
import { formatAmount, formatPercentage } from '../../helpers/format-helper.ts'
import type { Trailing } from '../../types/trailing.ts'

defineProps({
  trailing: {
    type: Array as PropType<Trailing[]>,
    required: true,
  },
})
</script>
