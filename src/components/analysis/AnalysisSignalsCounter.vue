<template>
  <ul class="mb-4">
    <li
      :style="{ color: signalColor(signal) }"
      class="md:inline me-4 font-bold"
      v-for="signal in signals"
      :key="signal"
    >
      {{ signal }} : {{ signalCounts[signal] ?? 0 }}
    </li>
  </ul>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  signalCounts: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  signalColor: {
    type: Function,
    required: true,
  },
})

const signals = ['STRONG BUY', 'BUY', 'HOLD', 'SELL', 'STRONG SELL']
</script>
