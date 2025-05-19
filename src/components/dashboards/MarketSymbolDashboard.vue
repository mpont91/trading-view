<template>
  <SignalsGraphContainer trading-mode="spot" :symbol="symbol" />
  <LastStrategiesContainer trading-mode="spot" :symbol="symbol" />
  <LastOpportunitiesContainer trading-mode="spot" :symbol="symbol" />
  <SignalsGraphContainer trading-mode="futures" :symbol="symbol" />
  <LastStrategiesContainer trading-mode="futures" :symbol="symbol" />
  <LastOpportunitiesContainer trading-mode="futures" :symbol="symbol" />
</template>
<script setup lang="ts">
import SignalsGraphContainer from '../containers/SignalsGraphContainer.vue'
import LastStrategiesContainer from '../containers/LastStrategiesContainer.vue'
import LastOpportunitiesContainer from '../containers/LastOpportunitiesContainer.vue'

defineProps({
  symbol: {
    type: String,
    required: true,
  },
})
</script>
