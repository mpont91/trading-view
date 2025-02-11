<template>
  <Card>
    <h2>Indicators</h2>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-neutral-400">
        <thead class="text-xs uppercase bg-neutral-700 text-neutral-400">
          <tr>
            <th class="px-6 py-3">Symbol</th>
            <th v-for="header in headers" :key="header" class="px-6 py-3">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(values, symbol) in groupedIndicators"
            :key="symbol"
            class="border-b bg-neutral-800 border-neutral-700"
          >
            <td class="px-6 py-4 font-bold">{{ symbol }}</td>
            <td
              v-for="header in headers"
              :key="`${symbol}-${header}`"
              class="px-6 py-4"
            >
              {{ formatNumber(values[header]) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '../Card.vue'
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { Indicator } from '../../types/indicator.ts'
import { formatNumber } from '../../helpers/format-helper.ts'

const props = defineProps({
  indicators: {
    type: Array as PropType<Indicator[]>,
    required: true,
  },
})

const groupedIndicators = computed(() => {
  const grouped: Record<string, Record<string, number>> = {}

  props.indicators.forEach(({ symbol, name, period, value }) => {
    if (!grouped[symbol]) {
      grouped[symbol] = {}
    }
    const key = `${name} (${period})`
    grouped[symbol][key] = value
  })

  return grouped
})

const headers = computed(() => {
  const uniqueHeaders = new Set<string>()
  props.indicators.forEach(({ name, period }) => {
    uniqueHeaders.add(`${name} (${period})`)
  })
  return Array.from(uniqueHeaders)
})
</script>
