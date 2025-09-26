<template>
  <StrategyAnalysisGraphContainer :symbol="symbol" />
  <IndicatorSMAGraphContainer :symbol="symbol" />
  <LastStrategiesContainer :symbol="symbol" />
  <LastOpportunitiesContainer :symbol="symbol" />
</template>
<script setup lang="ts">
import StrategyAnalysisGraphContainer from '../containers/StrategyAnalysisGraphContainer.vue'
import LastStrategiesContainer from '../containers/LastStrategiesContainer.vue'
import LastOpportunitiesContainer from '../containers/LastOpportunitiesContainer.vue'
import IndicatorSMAGraphContainer from '../containers/IndicatorSMAGraphContainer.vue'

defineProps({
  symbol: {
    type: String,
    required: true,
  },
})
</script>
