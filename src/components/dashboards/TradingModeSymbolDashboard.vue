<template>
  <LastTradesContainer :trading-mode="tradingMode" :symbol="symbol" />
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { TradingMode } from '../../types/trading-mode.ts'
import LastTradesContainer from '../containers/LastTradesContainer.vue'

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
