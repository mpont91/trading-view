<template>
  <Card :title="title">
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-neutral-400">
        <thead class="text-xs uppercase bg-neutral-700 text-neutral-400">
          <tr>
            <th class="px-6 py-3">Symbol</th>
            <th class="px-6 py-3">Price</th>
            <th class="px-6 py-3">Side</th>
            <th class="px-6 py-3">Take profit</th>
            <th class="px-6 py-3">Stop loss</th>
            <th class="px-6 py-3">Leverage</th>
            <th class="px-6 py-3">Created at</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="strategy in strategies"
            :key="strategy.id"
            class="border-b bg-neutral-800 border-neutral-700"
          >
            <td class="px-6 py-3">
              <a
                :href="`/${getFirstSegment()}/${strategy.symbol.toLowerCase()}`"
                class="font-medium text-blue-500 hover:underline"
              >
                {{ strategy.symbol }}
              </a>
            </td>
            <td class="px-6 py-3">{{ formatNumber(strategy.price) }}</td>
            <td class="px-6 py-3">{{ strategy.side.toUpperCase() }}</td>
            <td class="px-6 py-3">{{ formatNumber(strategy.tp) }}</td>
            <td class="px-6 py-3">{{ formatNumber(strategy.sl) }}</td>
            <td class="px-6 py-3">{{ strategy.leverage }}</td>
            <td class="px-6 py-3">
              {{ formatDate(strategy.createdAt.toString()) }}
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
import type { Strategy } from '../../types/strategy.ts'
import { formatDate, formatNumber } from '../../helpers/format-helper.ts'
import { getFirstSegment } from '../../helpers/url-helper.ts'

defineProps({
  title: {
    type: String,
    required: true,
  },
  strategies: {
    type: Array as PropType<Strategy[]>,
    required: true,
  },
})
</script>
