<template>
  <PerformanceContainer :symbol="symbol" />
  <LastTradesContainer :symbol="symbol" />
</template>
<script setup lang="ts">
import LastTradesContainer from '../containers/LastTradesContainer.vue'
import PerformanceContainer from '../containers/PerformanceContainer.vue'

defineProps({
  symbol: {
    type: String,
    required: true,
  },
})
</script>
