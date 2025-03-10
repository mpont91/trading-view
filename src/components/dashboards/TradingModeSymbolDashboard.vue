<template>
  <p>Working on it...</p>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { TradingMode } from '../../types/trading-mode.ts'

defineProps({
  tradingMode: {
    type: String as PropType<TradingMode>,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
})
</script>
