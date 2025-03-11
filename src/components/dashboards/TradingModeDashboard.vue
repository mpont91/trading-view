<template>
  <EquityGraphTradingModeContainer :trading-mode="tradingMode" />
  <PerformanceTradingModeContainer :trading-mode="tradingMode" />
  <CommissionEquityContainer
    v-if="tradingMode === 'spot'"
    :trading-mode="tradingMode"
  />
  <LastTradesContainer :trading-mode="tradingMode" />
</template>
<script setup lang="ts">
import EquityGraphTradingModeContainer from '../containers/EquityGraphTradingModeContainer.vue'
import PerformanceTradingModeContainer from '../containers/PerformanceTradingModeContainer.vue'
import CommissionEquityContainer from '../containers/CommissionEquityContainer.vue'
import LastTradesContainer from '../containers/LastTradesContainer.vue'
import type { PropType } from 'vue'
import type { TradingMode } from '../../types/trading-mode.ts'

defineProps({
  tradingMode: {
    type: String as PropType<TradingMode>,
    required: true,
  },
})
</script>
