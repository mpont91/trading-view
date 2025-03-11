<template>
  <LastStrategiesContainer :symbol="symbol" />
  <LastOpportunitiesContainer :symbol="symbol" />
</template>
<script setup lang="ts">
import LastStrategiesContainer from '../containers/LastStrategiesContainer.vue'
import LastOpportunitiesContainer from '../containers/LastOpportunitiesContainer.vue'

defineProps({
  symbol: {
    type: String,
    required: true,
  },
})
</script>
